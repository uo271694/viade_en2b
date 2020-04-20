import { fetchDocument } from "tripledoc";
import { ldp, schema} from "rdf-namespaces";
import { message } from "rdf-namespaces/dist/wf";
const request = require("request");

const $rdf = require("rdflib");
const ns = require("solid-namespace")();
//const ns = require('solid-namespace')($rdf);


//From the user inbox, retrieve all the notifications (marked as 'read'-> más adelante)
//Add the URL to a file located in /viade/shared/globalSharedWithMe.js

export async function getNotifications(inboxPath) {

    let notificationDocuments = [];
    notificationDocuments = await getNotificationDocuments(inboxPath);
    console.log("NOTIFIC DOCUMENTS");
    console.log(notificationDocuments);

    let not2 = processSharedRoutes(notificationDocuments);
    console.log('NOTIFICATIONS RETRIEVED');
    console.log(not2);

}


/**
* Returns the current list of notifications.
* Ex: "https://testingclrmrnd.inrupt.net/viade/inbox/"
*/
export async function getNotificationDocuments(inboxPath) {
    var inbox = inboxPath;
    var containerDoc = await fetchDocument(inbox);

    //if the document exists
    if (containerDoc) {
        var subject = containerDoc.getSubject(inbox);
        var containerURLS = subject.getAllRefs(ldp.contains);

        var result = []
        for (var i = 0; i < containerURLS.length; i++) {
            try {
                //FETCH DE LA NOTIFICACIÓN
                // console.log('FETCH DE LA NOTIFICACIÓN');
                // console.log(containerURLS[i]);
                var doc = await fetchDocument(containerURLS[i]);

                if (doc) {
                    console.log('A1');
                    result = [...result, doc];

                    //var subjectNotification = containerURLS[i];
                    //console.log(subjectNotification);

                    //console.log('B2');
                    //var messageNotification = containerURLS[i].getSubject(subjectNotification);
                    //console.log('C3');
                    //if (messageNotification){
                    //sconsole.log('THERE IS A NOTIFICATION');
                    //const routeNotification = messageNotification.getString(ns.as("summary"));
                    //console.log('MESSAGE NOTIFICATION');
                    //console.log(routeNotification);
                    //}

                }
            } catch (e) {
            }
        }
        return result
    }
    return [];
}

export async function processSharedRoutes(notificationDocuments) {
    var result = [];

    if (notificationDocuments.length > 0) {
        for (let i = 0; i < notificationDocuments.length; i++) {
            var message = notificationDocuments[i].getSubject(
                "https://testingclrmrnd.inrupt.net/viade/inbox/5cbd2db0-7cb8-11ea-b984-edbaa4d4ab97.ttl"
            );
            //console.log('MESSAGE');
            //console.log(message);

            //const route = message.getString(schema.license);
            const route = message.getString(ns.as("summary"));

            console.log('ROUTE');
            console.log(route);
            result.push(route);
        }
    }
    return result;
}


/**
* Method that allows to send a notification to a 
* friend.
* @param {} webIdFriend 
* @param {*} content 
*/
export async function sendNotification(webIdFriend, content, uuid) {
    var inbox = webIdFriend + "/viade/inbox/";

    await request({
        method: "POST",
        uri: inbox,
        body: content,
        headers: {
            "Content-Type": "text/turtle"
        }
    },
        function (error, response, content) {
            if (error) { return false; } else {
                //console.log("Notification sended");
                return true;
            }
        })
}

export function createNotificationContent(type, title, webId, routePath, time, uuid) {
    return `@prefix terms: <http://purl.org/dc/terms#>.
          @prefix as: <https://www.w3.org/ns/activitystreams#> .
          @prefix schema: <http://schema.org/> .
          @prefix solid: <http://www.w3.org/ns/solid/terms#> .
          @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
          @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
          @prefix : <${webId + `viade/inbox/` + uuid + `.ttl`}>.
          <${webId + `viade/inbox/` + uuid + `.ttl`}> a as:${type} ;
          schema:license <https://creativecommons.org/licenses/by-sa/4.0/>;
          terms:title "${title}" ;
          as:summary "${routePath}" ;
          as:actor <${webId}> ;
          solid:read "false"^^xsd:boolean ;
          as:published "${ time}"^^xsd:dateTime .`
}


export function createNotificationJSONLD(webIdAuthor, routePath, webIdTo){
    return JSON.stringify(
  
        {
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": "NEW ROUTE",
            "type": "RouteShared",
  
            "actor": {
                "type": "Person",
                "name": webIdAuthor
            },
            "object": {
                "type": "route",
                "name": routePath
            },
            "target": {
                "type": "Person",
                "name": webIdTo
            }
  
        }
  
    );
}

