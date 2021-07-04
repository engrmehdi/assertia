import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private notifications = [
        {
            name: 'Mehdi Hayyat',
            text: 'After you get up and running, you can place Font Awesome icons just about...',
            time: '1 min ago'
        },
        {
            name: 'Mehdi Hayyat',
            text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
            time: '2 hrs ago'
        },
        {
            name: 'Mehdi Hayyat',
            text: 'Want to request new icons? Here\'s how. Need vectors or want to use on the...',
            time: '10 hrs ago'
        },
        {
            name: 'Mehdi Hayyat',
            text: 'Explore your passions and discover new ones by getting involved. Stretch your...',
            time: '1 day ago'
        },
        {
            name: 'Mehdi Hayyat',
            text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
            time: '1 day ago'
        },
        {
            name: 'Mehdi Hayyat',
            text: 'Need some support to reach your goals? Apply for scholarships across...',
            time: '2 days ago'
        },
        {
            name: 'Mehdi Hayyat',
            text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
            time: '1 week ago'
        }
    ];   
 
    public getNotificaton():Array<Object> {
        return this.notifications;
    } 
}