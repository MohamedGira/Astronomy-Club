/* export const createEvent=catchAsync( async (req,res,next)=>{
    
    const body=jsonifyObj(req.body)

    const filteredEvent=filterObj(body,Event.schema.paths,['images','checkpoints','gatheringPoints','banner'])
    //handling excluded fields

    const event=await Event.create(filteredEvent)
    

    if(body.checkpoints){
        //checkpoints exists
        try{
            for (let checkpoint in body.checkpoints){
                await createCheckpoint(body.checkpoints[checkpoint],event._id,req.files)
            }
        }
        catch(err){
            const del=await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event ${del.title}, checkpoints issue`)
            throw(err)
        }
    }
    if(body.gatheringPoints){
         //gathering points exists
         try{
             for (let gatheringpoint in body.gatheringPoints){
                 await createGatheringPoint(body.gatheringPoints[gatheringpoint],event._id,req.files)
            }
        }
        catch(err){
            const del=await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event ${del.title}, gathering points issues`)
            throw(err)
        }
    }

    if (req.files){
        const imgslist=[] 
        try{
            let keys=Object.keys(req.files)
            for(let i in keys){
                if (keys[i].match(/event-image-\d+/)){
                    imgslist.push(await createImageObject(req.files[keys[i]]))
                }
            }
            event.images=imgslist
            const banner=await createImageObject(req.files.banner)
            event.banner=banner
            event.save()
            imgslist.push(banner)
        }catch(err){

            await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event, imgs issue`)
        

            return next(new AppError(500),'image saving issue'+err.message)
        }   
    }
 
    
    
    return res.status(200).json({
        message:"event created successfully",
        event
    });

})
 */