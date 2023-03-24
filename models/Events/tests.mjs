const l=await Location.create({landmark:"hi",location:{coordinates:[3,5]}})
const g=await GatheringPoint.create({from:Date.now(),to:Date.now(),location:{landmark:"hi",location:{coordinates:[3,2]}}})
const l2=await Location.create({landmark:"hi",location:{type:"alo",coordinates:[3,5]}})

console.log(g)
GatheringPoint
console.log(l)

const ec=await Event.create({
    "title":"astronomy conference",
    "type":"trip",
    "description":"مؤتمر جامد جدا",
    "banner":"link",
    "images":["link","link","link"],
    "capacity":50,
    "price":20,
    "visibility":true,
    "date":Date.now(),
    "location":{
        "landmark":"hi",
        "location":{
        "coordinates":[30,25]// شوف لو ينفع تطلعلو google map window يختار منها
        }
    },
    "checkpoints":[{
        "name":"Farouk elbaz",
        "description":"tare2 elnaga7",
        "startsAt":Date.now(),
        "endsAt":Date.now(),
        "type":"speaker",
        "speaker":{
            "name":"farouk elbaz",
            "title":"astrlogist",
            "description":"good boy",
            "image":"limk"
        },
        "location":{
        "landmark":"stage",
        "location":{"coordinates":[20,20]}
        }
    },
    {
        "name":"Lunch",
        "description":"tare2 elnaga7",
        "startsAt":Date.now(),
        "endsAt":Date.now(),
        "type":"gathering",
        
        "location":{
        "landmark":"cafteria",
        "location":{"coordinates":[20,20]}
        }
    }
],
    "gatheringPoints":[
        {
            "from":Date.now(),
            "to":Date.now(),
            "location":{
                "landmark":"mohamed nageeb",
                "location":{"coordinates":[20,20]}
            }
        }
    ,
    
        {
            "from":Date.now(),
            "to":Date.now(),
            "location":{
                "landmark":"sadat",
                "location":{"coordinates":[20,20]}
            }
        }
    ]
})
console.log(ec)



///postmanon
const ev={
    "title":"astronomy conference",
    "type":"trip",
    "description":"مؤتمر جامد جدا",
    "banner":"link",
    "images":["link","link","link"],
    "capacity":50,
    "price":20,
    "visibility":true,
    "date":"2023-03-24T13:14:17.238Z",
    "location":{
        "landmark":"hi",
        "location":{
        "coordinates":[30,25]
        }
    },
    "checkpoints":[{
        "name":"Farouk elbaz",
        "description":"tare2 elnaga7",
        "startsAt":"2023-03-24T13:14:17.238Z",
        "endsAt":"2023-03-24T13:14:17.238Z",
        "type":"speaker",
        "speaker":{
            "name":"farouk elbaz",
            "title":"astrlogist",
            "description":"good boy",
            "image":"limk"
        },
        "location":{
        "landmark":"stage",
        "location":{"coordinates":[20,20]}
        }
    },
    {
        "name":"Lunch",
        "description":"tare2 elnaga7",
        "startsAt":"2023-03-24T13:14:17.238Z",
        "endsAt":"2023-03-24T13:14:17.238Z",
        "type":"gathering",
        
        "location":{
        "landmark":"cafteria",
        "location":{"coordinates":[20,20]}
        }
    }
],
    "gatheringPoints":[
        {
            "from":"2023-03-24T13:14:17.238Z",
            "to":"2023-03-24T13:14:17.238Z",
            "location":{
                "landmark":"mohamed nageeb",
                "location":{"coordinates":[20,20]}
            }
        }
    ,
    
        {
            "from":"2023-03-24T13:14:17.238Z",
            "to":"2023-03-24T13:14:17.238Z",
            "location":{
                "landmark":"sadat",
                "location":{"coordinates":[20,20]}
            }
        }
    ]
}