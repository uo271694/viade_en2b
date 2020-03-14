import Route from "../entities/Route"
import GeoCoordinate from "../entities/GeoCoordinate"
import {JsonLdParser} from "jsonld-streaming-parser";

class CreateRoute{
    create(route){
        let myParser = new JsonLdParser();
        myParser
            .on("data", "test.jsonld")
            .on('error', console.log("Fuck you"));

        myParser.write('{');
        myParser.write('"@type": "Route",');
        myParser.write('"name": "route.name",');
        myParser.write('"itirenary": {');
        myParser.write('"@type": "Itirenary",');
        myParser.write('"numberOfitems": "route.itirenary.numberOfItems",');
        myParser.write('"itemList" : [{');
        route.itirenary.map(a => {
            myParser.write('"@type": "Item",');
            myParser.write('"order : a.order",');
            myParser.write('"geoCoordinate: {');
            myParser.write('"@type": "GeoCoordinate",');
            myParser.write('"latitude : a.geoCoordinate.latitude",');
            myParser.write('"longitude : a.geoCoordinate.longitude"');
            myParser.write('}');
        })

        myParser.write(']}');
    }

    createNormal(route){
        let str = "{";
        str+="@type: Route,";
        str+="name : '"+route.name+"',";
        str+="itirenary: {";
        str+="@type: 'Itirenary',";
        str+="numberOfitems : '"+route.itirenary.numberOfItems+"',";
        str+="itemList : [{";
        route.itirenary.map(a =>{
            str+= "@type: 'Item',";
            str+= "order : '" +a.order +"',";
            str+= "geoCoordinate : {"
            str+= "latitude : '" +a.geoCoordinate.latitude+"',";
            str+= "longitude : '" +a.geoCoordinate.longitude+"'";
            str+="}"
        })
        str+= "}]}";

        let json = JSON.stringify(eval(str));
        let fs = require('fs');
        fs.writeFile("test.json", json,err => console.log("something went wrong"));
    }
}

export default CreateRoute;