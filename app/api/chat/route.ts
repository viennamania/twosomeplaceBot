import { openai } from "@ai-sdk/openai";

import {
  convertToCoreMessages,
  streamText
} from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  ///console.log(messages);

  /*
  [
    { role: 'user', content: '응' },
    { role: 'assistant', content: '안녕하세요! 어떻게 도와드릴까요?' },
    { role: 'user', content: '하이' },
    { role: 'assistant', content: '안녕하세요! 무엇을 도와드릴까요?' },
    {
      role: 'user',
      content: '설명해줘',
      experimental_attachments: [ [Object] ]
    },
    {
      role: 'assistant',
      content: '이 이미지는 어반 플레이스 강남 호텔의 예약 정보입니다. \n' +
        '\n' +
        '- 평점은 6.7점입니다.\n' +
        '- 체크인은 11월 7일, 체크아웃은 11월 9일입니다.\n' +
        '- 성인 1명이 2박 숙박하며, 요금은 270,801원입니다.\n' +
        '- 제공되는 시설로는 전용 욕실, 무료 Wi-Fi, 주차장, 에어컨, 간이주방 등이 있습니다.\n' +
        '- 위치는 서울 서초구 효령로77길 30입니다.\n' +
        '- Genius 레벨 1 회원으로 10% 할인이 적용됩니다.'
    },
    { role: 'user', content: '안녕' },
    { role: 'assistant', content: '안녕하세요! 또 궁금한 게 있으면 말씀해 주세요.' },
    { role: 'user', content: '안녕' },
    { role: 'assistant', content: '안녕하세요! 어떻게 도와드릴까요?' },
    { role: 'user', content: '안녕' },
    { role: 'assistant', content: '안녕하세요! 무엇을 도와드릴까요?' },
    { role: 'user', content: '안녕' },
    { role: 'assistant', content: '안녕하세요! 필요한 게 있으면 말씀해 주세요.' },
    {
      role: 'user',
      content: '설명',
      experimental_attachments: [ [Object] ]
    }
  ]
  */

          // experimental_attachments
        // [
        //   {
        //     name: 'jupyter.png',
        //     contentType: 'image/png',
        //     url: ''
        //   }
        // ]

        // set url to 'https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/a763fH2-HEgFDFyFw4VqkhpQXrDaZOgH6v2U8D.png'

  /*
  var updatedMessages = 


    messages.forEach((message : any) => {
      if (message.role === 'assistant' && message.experimental_attachments) {
        message.experimental_attachments.forEach((attachment : any) => {
          if (attachment && attachment.contentType && attachment.contentType.startsWith('image')) {
            attachment.url = 'https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/a763fH2-HEgFDFyFw4VqkhpQXrDaZOgH6v2U8D.png';
          }
        }
      }
    });
    */


  

  

  const result = await streamText({
    
    model: openai("gpt-4o"),

    system:
      "do not respond on markdown or lists, keep your responses brief, you can ask the user to upload images or documents if it could help you understand the problem better",
    
    messages: convertToCoreMessages(messages),

    /////messages: convertToCoreMessages(updatedMessages),


  });

  ///return result.toDataStreamResponse();

  //console.log('result', result);


  const response = result.toDataStreamResponse();

  //console.log('response', response);

  return response;

}
