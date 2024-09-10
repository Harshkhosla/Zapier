// require('dotenv').config()
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka ,Partitioners} from "kafkajs";
import { parse } from "./parser";
import { sendEmail }  from "./email"
import { sendSol } from "./solana";

const TOPIC_NAME = "zap-events"
const client = new PrismaClient();
const kafka = new Kafka({
  clientId: 'Outbox-processor-2',
  // brokers: ['localhost:9092']
  brokers: ['kafka:9092']
})


async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker-2" });
  await consumer.connect();
  const producer =  kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
  });
  await producer.connect();


  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })
      if (!message.value?.toString()) {
        return;
      }

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await client.zapRun.findFirst({
        where: {
          id: zapRunId
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true
                }
              }
            }
          },
        }
      });
      const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);

      if (!currentAction) {
        console.log("Current action not found?");
        return;
      }

      const zapRunMetadata = zapRunDetails?.metadata;

      if (currentAction.type.id === "email") {
        const body = "kcshjdabdbsjdbsjvbshjvbhdjvb";
        // const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
        // const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
        const to = "harshkhosla9945@gmail.com";
        console.log(`Sending out email to ${to} body is ${body}`)
        await sendEmail(to, body);
        console.log(`Sending out email to  body is `)
      }

      if (currentAction.type.id === "send-sol") {

        // const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
        // const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
        // console.log(`Sending out SOL of ${amount} to address ${address}`);
        // await sendSol(address, amount);
        console.log(`Sending out email to  body is `)
      }
      
      // 
      await new Promise(r => setTimeout(r, 500));

      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1; // 1
      console.log(lastStage);
      console.log(stage);
      if (lastStage !== stage) {
        console.log("pushing back to the queue")
        await producer.send({
          topic: TOPIC_NAME,
          messages: [{
            value: JSON.stringify({
              stage: stage + 1,
              zapRunId
            })
          }]
        })  
      }

      console.log("processing done");

      await consumer.commitOffsets([{
        topic: TOPIC_NAME,
        partition: partition,
        offset: (parseInt(message.offset) + 1).toString(),
      }])
    },
  })


}
main();