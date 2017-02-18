/**
 * File for storing the constant and configuration
 * 
 * Description :
 * -- appId -> The facebook application ID listed on the Facebook Application Page
 * -- stopWords -> Words you want to filter out from the messages fetched from Facebook Graph API
 * -- tokenAccessRight -> Rights required for getting data. You can test on the Facebook Graph API Explorer first.
 * -- targetMessageNumber -> the maximum number of message that you want to collect
 */

const appId = '1113237095453404';

const stopWords = [

];

const tokenAccessRight = [
    'public_profile',
    'email',
    'user_posts'
]
const targetMessageNumber = 1000;