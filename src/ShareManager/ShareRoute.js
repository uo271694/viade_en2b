import {setPermissionsTo, checkPermissions} from 'util/PermissionManager';
import {sendNotification, createNotificationContent} from 'NotificationManager/NotificationManager';
import { v4 as uuidv4 } from 'uuid';
const request = require("request");


/**
 * Function that allows a user to share a route with a friend.
 * Provides READ permissions to the friend over the route of the user autenticated,
 * and sends a notification to the inbox of the friend, containing the url of that
 * route.
 * 
 * @param {String} route path to the route the user wants to share.
 * @param {String} webIdFriend represents the id of the friend.
 * @param {String} webIdAuthor represents the id of the user autenticated.
 */
export async function ShareWith(route, webIdFriend, webIdAuthor){
    console.log('IN');
   
    //check .acl created for the path;

    //check friend has an inbox;

    //check if it's already shared
    const shared = await checkPermissions("READ", webIdFriend, route);
    if(!shared){
        //set permissions to read in the route
        const profileFriend = webIdFriend + 'profile/card#me';
        
        //setPermissionsTo("READ", route, webIdFriend, webIdAuthor);
        setPermissionsTo("READ", route, profileFriend);


        //send notification to other user inbox
        const content = {
            title: "NEW ROUTE Notification",
            summary: route,
            actor: webIdFriend
        };

        const uuid = uuidv4();
        const contenido = createNotificationContent("Announce", "ROUTE", webIdFriend, route, new Date(), uuid);
       

        try{
            sendNotification(webIdFriend, contenido, uuid);
        } catch(e){
            //console.log('There was an error');
        }        
        
    } else {
        //console.log('The route was already shared.');
        return false;
    }
   
}


