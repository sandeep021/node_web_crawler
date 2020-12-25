const cherio = require('cherio');
const request = require('request');
const fs = require('fs');


var WriteStream  = fs.createWriteStream("allLinks.txt", "UTF-8");
let arrayOfLinks=[];
function getAllUrl(URL){
  request(URL, (err, resp, html)=>{
      if(!err && resp.statusCode == 200){
          console.log("Request was success ");
          const $ = cherio.load(html);
          $("a").each((index, image)=>{
              var img = $(image).attr('href');
              var baseUrl = URL;
              var Links = baseUrl+img;
              arrayOfLinks.push(Links);
              WriteStream.write(Links);
              WriteStream.write("\n");
              //doing dfs here
              while(arrayOfLinks.length>0){
                var newUrl = arrayOfLinks[arrayOfLinks.length-1];
                arrayOfLinks.pop();
                if(!arrayOfLinks.includes(newUrl)){
                  getAllUrl(newUrl);
                }
                else{
                  console.log("already present URL");
                }
              }
          });
      }else{
          console.log("Request Failed ");
      }
  });
  return ;
}
URL='https://medium.com/';
getAllUrl(URL);
