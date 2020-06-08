const config = require('./config');
const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const linebot = require('linebot');
const bodyParser = require('body-parser')
app.set('secret', config.config.secret)


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))


const bot = linebot({
  channelId: config.config.CHANNEL_ID,
  channelSecret: config.config.CHANNEL_SECRET,
  channelAccessToken: config.config.CHANNEL_ACCESS_TOKEN,
  verify: true
});

app.post('/',  function (req, res) {
  bot.parse(req.body);
  return res.json({});
});


bot.on('message', function (event) {
  //console.log(event)
  let id = event.source.userId
  let message = event.message.text.toLowerCase()
  if(fs.existsSync(`${id}.json`)){
    let userData = JSON.parse(fs.readFileSync(`${id}.json`, 'utf8'));
  if(! userData.userChoice ){
      switch(message){
        case "yes":
          fs.unlink(`${id}.json`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
            const data = {
               userChoice: message,
               actorName: null
            }
            fs.appendFile(`${id}.json`, JSON.stringify(data), 'utf8', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            var replyMsg =  ["Let's play a game", "Who is your Favourite Actor ? \n"
            + "1" + ")" + "Salman Khan \n" + "2" + ")" + "Sharukh Khan \n" + "3" + ")" + "Akshay Kumar \n"
            + "4" + ")" + "None \n"]
            event.reply(replyMsg)
            })
        break;
        case "no":
          fs.unlink(`${id}.json`, function (err) {
            if (err) throw err;
            console.log('File deleted!')
          })
          var replyMsg = ["Thank You For Messaging me", "Will meet some other time.......", "Bye, you missed a cute girl"]
          event.reply(replyMsg)
          break;
        default:
          var replyMsg = "Please type yes or no"
          event.reply(replyMsg)
      }
    }
    else if(!userData.actorName){
      switch(message){
        case "1": case "2": case "3": case "4":
          fs.unlink(`${id}.json`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
            const data = {
               userChoice: userData.userChoice,
               actorName: message === "1" ? "Salman Khan": message === "2" ? "Sharukh Khan" :message === "3" ? "Akshay Kumar" : "none",
               colorName: null
            }
            fs.appendFile(`${id}.json`, JSON.stringify(data), 'utf8', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            var replyMsg = ["Thank You For Choosing", "Next Question: \nWhat is your favourite color?\n"
            + "1" + ")" + "Red \n" + "2" + ")" + "Blue \n" + "3" + ")" + "White \n"
            + "4" + ")" + "None \n"]
            event.reply(replyMsg)
      })
    }
}
  else if(! userData.colorName){
    switch(message){
      case "1": case "2": case "3": case "4":
        fs.unlink(`${id}.json`, function (err) {
          if (err) throw err;
          console.log('File deleted!');
          const data = {
             userChoice: userData.userChoice,
             actorName: userData.actorName,
             colorName: message === "1" ? "Red": message === "2" ? "Blue" :message === "3" ? "White" : "none",
             actressName: null
          }
          fs.appendFile(`${id}.json`, JSON.stringify(data), 'utf8', function (err) {
              if (err) throw err;
              console.log('Saved!');
          });
          var replyMsg = ["Thank You For Choosing","Here come's next question:\nWho is your favourite actress?\n"
          + "1" + ")" + "Aishwarya Rai \n" + "2" + ")" + "Sunny Leone \n" + "3" + ")" + "Priyanka Chopra \n"
            + "4" + ")" + "None \n"]
          event.reply(replyMsg)
    })
  }
  }
  else if(! userData.actressName){
    switch(message){
      case "1": case "2": case "3": case "4":
        fs.unlink(`${id}.json`, function (err) {
          if (err) throw err;
          console.log('File deleted!');
          const data = {
             userChoice: userData.userChoice,
             actorName: userData.actorName,
             colorName: userData.colorName,
             actressName: message === "1" ? "Aishwarya Rai": message === "2" ? "Sunny Leone" :message === "3" ? "Priyanka Chopra" : "none",
             inspiredName: null
          }
          fs.appendFile(`${id}.json`, JSON.stringify(data), 'utf8', function (err) {
              if (err) throw err;
              console.log('Saved!');
          });
          var replyMsg = ["Thank You For Choosing","Here come's next question:\nWho is your insipiration?\n"
          + "1" + ")" + "Parents \n" + "2" + ")" + "Political Leaders \n" + "3" + ")" + "BusinessMan \n"
            + "4" + ")" + "None \n"]
          event.reply(replyMsg)
    })
  }
  }
  else if(! userData.inspiredName){
    switch(message){
      case "1": case "2": case "3": case "4":
        fs.unlink(`${id}.json`, function (err) {
          if (err) throw err;
          console.log('File deleted!');
          const data = {
             userChoice: userData.userChoice,
             actorName: userData.actorName,
             colorName: userData.colorName,
             actressName: userData.actressName,
             inspiredName: message === "1" ? "Parents": message === "2" ? "Political Leaders" :message === "3" ? "BusinessMan" : "none",
             placeName: null
          }
          fs.appendFile(`${id}.json`, JSON.stringify(data), 'utf8', function (err) {
              if (err) throw err;
              console.log('Saved!');
          });
          var replyMsg = ["Thank You For Choosing","Here come's last question:\nWhere can we meet?\n"
          + "1" + ")" + "CoffeShop \n" + "2" + ")" + "Public Place \n" + "3" + ")" + "Shopping Mall \n"
            + "4" + ")" + "Long Drive"]
          event.reply(replyMsg)
    })
  }
  }
  else if(! userData.placeName){
    switch(message){
      case "1": case "2": case "3": case "4":
        fs.unlink(`${id}.json`, function (err) {
          if (err) throw err;
          console.log('File deleted!');
          const data = {
             userChoice: userData.userChoice,
             actorName: userData.actorName,
             colorName: userData.colorName,
             actressName: userData.actressName,
             inspiredName: userData.inspiredName,
             placeName: message === "1" ? "CoffeShop": message === "2" ? "Public Place" 
             :message === "3" ? "Shopping Mall" : message === "4" ? "Long Drive" : "none",
             finalChoice: null
          }
          fs.appendFile(`${id}.json`, JSON.stringify(data), 'utf8', function (err) {
              if (err) throw err;
              console.log('Saved!');
          });
          var replyMsg =  ["Okay", "Are you waiting to meet me ", "Say yes or no"]
          event.reply(replyMsg)
    })
  }
  }
  else if(! userData.finalChoice){
    switch(message){
      case "yes":
        fs.unlink(`${id}.json`, function (err) {
          if (err) throw err;
          console.log('File deleted!');
          const data = {
            userChoice: userData.userChoice,
            actorName: userData.actorName,
            colorName: userData.colorName,
            actressName: userData.actressName,
            inspiredName: userData.inspiredName,
            placeName: userData.placeName,
            finalChoice: "yes"
          }
          fs.appendFile(`${id}.json`, JSON.stringify(data), 'utf8', function (err) {
              if (err) throw err;
              console.log('Saved!');
          });
          var replyMsg = ["Iam impressed with your answers", "we are alike persons",
           "Will meet you soon at\n" +  userData.placeName + "\n" + "as you wished", "Bye, Take care"]
           event.reply(replyMsg)
           fs.unlink(`${id}.json`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
           })
    })
    break;
      case "no":
        fs.unlink(`${id}.json`, function (err) {
          if (err) throw err;
          console.log('File deleted!')
        })
        var replyMsg = ["Thank You For Messaging me", "Don't ever show me your face..."]
        event.reply(replyMsg)
        break;
      default:
        var replyMsg = "Please type yes or no"
        event.reply(replyMsg)
  }
  }
}
  else{
    var replyMsg = ["Hi I am your fake girlfriend","I want to be your GirlFriend", "What do you say yes or no ?"]
      const defaultData = {
      userChoice: null,
      actorName: null,
      colorName: null,
      actressName: null,
      inspiredName: null,
      placeName: null,
      finalChoice: null
    }
     fs.appendFile(`${id}.json`, JSON.stringify(defaultData), 'utf8', function (err) {
      if (err) throw err;
      console.log('Saved!');
      })
    event.reply(replyMsg)
  }
})
app.listen(5000)