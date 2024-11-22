export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { Bot, webhookCallback } from 'grammy'

import Replicate from "replicate";
import * as fal from "@fal-ai/serverless-client";

import { openai } from "@ai-sdk/openai";

import {
  convertToCoreMessages,
  streamText
} from "ai";







// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 60 seconds




const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const token = process.env.TELEGRAM_BOT_TOKEN



if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')

const bot = new Bot(token)

bot.on('message:text', async (ctx) => {


    console.log(ctx.message.text)

    if (ctx.message.text === '/start') {


        //await ctx.reply('Hello!')

        // image
        // url: https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/RiMb8wi-jNIcD6NZIkNZDiCTEwU5C5SIZHFpAu.png

        const photo = 'https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/RiMb8wi-jNIcD6NZIkNZDiCTEwU5C5SIZHFpAu.png'
        await ctx.replyWithPhoto(photo, {
            caption: 'This is a photo!'
        })

        return


    }  else if (ctx.message.text === '/tbot') {


        //await ctx.reply('Hello!')

        // generate a photo
        try {


      

            //setMessageMintingAgentNft('AI 에이전트 이미지 생성중입니다');
            await ctx.reply('AI 에이전트 이미지 생성중입니다...');








            // array of strings
            // gold, silver, blue, red, green, black, white, yellow, orange, pink, purple, brown, gray, cyan, magenta
            const robotColors = ["gold", "silver", "blue", "red", "green", "black", "white", "yellow", "orange", "pink", "purple", "brown", "gray", "cyan", "magenta"];

            const randomColor = Math.floor(Math.random() * robotColors.length);

            const englishPrompt = "One cute and " + randomColor + " color metallic robot character with shiny skin in Japanese anime style with a sign PUMP. transparent background.";


            const negative_prompt = "easynegative,ng_deepnegative_v1_75t,((monochrome)),((grayscale)),bad-picture-chill-75v, (worst quality, low quality:1.4), monochrome, grayscale, sketches, paintings, lowres, normalres, blurry, acnes on face, {{sperm}}, {{bra}}";

            let input = {
                ///seed: 4234234,

                prompt: englishPrompt,

                output_quality: 90,

                //image_size: "square",
                image_size: "square",
                //image_size: "square_hd",

                disable_safety_checker: true,

                negative_prompt: negative_prompt,
            };



            let hosting = "" as any;
            let model = "" as any;

        
            /*
            const randomModel = Math.floor(Math.random() * 5);


        
        

            if (randomModel == 0) {
                hosting = "replicate";
                model = "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f";
            } else if (randomModel == 1) {
                hosting = "replicate";
                model = "datacte/proteus-v0.2:06775cd262843edbde5abab958abdbb65a0a6b58ca301c9fd78fa55c775fc019";
            } else if (randomModel == 2) {
                hosting = "replicate";
                model = "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24";
            } else {
                hosting = "fal";
                model = "fal-ai/flux/dev";
            }
            */

            hosting = "fal";
            model = "fal-ai/flux-realism";




            let result = [] as any;

            let output = [] as any;

            if (hosting === "replicate") {

                output = await replicate.run(model, { input }) as any;

                

            } else if (hosting === "fal") {

                const data = await fal.subscribe(model, {

                    input: {
                    ///seed: 4072637067,
                    prompt: englishPrompt,
                    num_images: 1,
                    enable_safety_checker: false,
            
                    },
                    logs: true,
                    onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        update.logs.map((log) => log.message).forEach(console.log);
                    }
                    },
                }) as any;


            
                ////console.log(data);

                
            
                //const output = data.images[0]?.url;
                // output is array of images
                output = [
                    data?.images[0]?.url,
                ];

            }

            //console.log("result=", result);
            /*
            URL {
                href: 'https://replicate.delivery/yhqm/D2aV5KH1Ma7CH9KY8ZppQcZdbKIc5B43aJxQLmTl7hvJDe2JA/out-0.png',
                origin: 'https://replicate.delivery',
                protocol: 'https:',
                username: '',
                password: '',
                host: 'replicate.delivery',
                hostname: 'replicate.delivery',
                port: '',
                pathname: '/yhqm/D2aV5KH1Ma7CH9KY8ZppQcZdbKIc5B43aJxQLmTl7hvJDe2JA/out-0.png',
                search: '',
                searchParams: URLSearchParams {},
                hash: ''
            }
            */

            // get href from result string

            ///console.log("result=", result.toString());


            output.forEach((element: any) => {
                result.push({ url: element });
            } );

            const imageUrl = result[0].url;
        
            if (!imageUrl) {

                throw new Error('Failed to generate image');
            }


            ///setAgentImage(imageUrl);


            /*
            setMessageMintingAgentNft('AI 에이전트 NFT 발행중입니다');

            const contract = getContract({
                client,
                chain: polygon,
                address: erc721ContractAddress,

              });


            const transaction = mintTo({
                contract: contract,
                to: address as string,
                nft: {
                    name: agentName,
                    description: agentDescription,

                    ////image: agentImage,
                    image: imageUrl,

                },
            });

            //await sendTransaction({ transaction, account: activeAccount as any });



            //setActiveAccount(smartConnectWallet);

            const transactionResult = await sendAndConfirmTransaction({
                transaction: transaction,
                account: activeAccount,

                ///////account: smartConnectWallet as any,
            });

            //console.log("transactionResult", transactionResult);


            if (!transactionResult) {
                throw new Error('AI 에이전트 NFT 발행 실패. 관리자에게 문의해주세요');
            }

            setMessageMintingAgentNft('AI 에이전트 NFT 발행 완료');


            // fetch the NFTs again
            const response = await fetch("/api/agent/getAgentNFTByWalletAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    //erc721ContractAddress: erc721ContractAddress,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) {
                    setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }
            }

            setAgentName("");
            setAgentDescription("");
            

            toast.success('AI 에이전트 NFT 발행 완료');
            */


            const photo = imageUrl;



            await ctx.replyWithPhoto(photo, {
                caption: 'This is a AI Agent photo!'
            })




        } catch (error) {
            console.error("mintAgentNft error", error);

            //toast.error('AI 에이전트 NFT 발행 실패');

            //setMessageMintingAgentNft('AI 에이전트 NFT 발행 실패');

            await ctx.reply('AI 에이전트 이미지 생성 실패');
        }
       
        
        
        
    

        return

    }
    /*
    else if (ctx.message.text === '/청개구리') {


        //await ctx.reply('Hello!')

        // image
        // url: https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/RiMb8wi-jNIcD6NZIkNZDiCTEwU5C5SIZHFpAu.png

        const photo = 'https://twosomeplace-bot.vercel.app/blue-frog.png'
        await ctx.replyWithPhoto(photo, {
            caption: '윤명환은 청개구리다!'
        })

        return
    }
    */
    else if (ctx.message.text === '/help') {

        await ctx.reply('Available commands: /start, /tbot')

        return

    }





    await ctx.reply(ctx.message.text)

    

    // close the context

    ctx.api.close()




})

bot.on('message:photo', async (ctx) => {

    console.log("message:photo", ctx.message.photo)
    /*
    [
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADcwADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWeA',
            file_size: 1171,
            width: 42,
            height: 90
        },
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADbQADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWcg',
            file_size: 13532,
            width: 148,
            height: 320
        },
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADeAADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWfQ',
            file_size: 55582,
            width: 369,
            height: 800
        },
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADeQADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWfg',
            file_size: 99661,
            width: 591,
            height: 1280
        }
    ]
    */
    // get the last photo

    const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id

    // get image from photo

    const photoInfo = await ctx.api.getFile(photo)

    console.log("photoInfo", photoInfo)
    /*
    {
        file_id: 'AgACAgUAAxkBAAM7Z0Bq4By_0DSwiBr18_SXceWmVIsAAmTDMRsJTwABVgaKqMNcfad3AQADAgADeQADNgQ',
        file_unique_id: 'AQADZMMxGwlPAAFWfg',
        file_size: 156830,
        file_path: 'photos/file_0.jpg'
        }
    */
   // get the image url
    const photoUrl = `https://api.telegram.org/file/bot${token}/${photoInfo.file_path}`

    console.log("photoUrl", photoUrl)

  
    await ctx.reply('This is a photo!')

 
    
    ctx.api.close()



} )

export const POST = webhookCallback(bot, 'std/http')
