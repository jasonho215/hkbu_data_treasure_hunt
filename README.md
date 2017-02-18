
Client-side Facebook Graph API Fetcher
======
This is a client-side fetcher for HKBU Data Treasure Hunt Competition.

Prerequisite
-----
#### Works on Facebook Developer Website
1.  Goto [here][6] to setup a facebook developer account and setup a facebook application
2.  Enable **facebook login** in **Product** category in Facebook Application page.
3.  In **facebook login** (under the Facebook Application page), add "localhost:PORT_NUM" to **Vaild OAuth redirect URL** field. By default, the PORT_NUM is **8080**.

#### Installation of required software
Install the software in the following order

1. [node.js engine LTS version] [7] (Based on System Architecture)
2. [Visual Studio Code](https://code.visualstudio.com/Download) 
3. npm package -- ``http-server``
	 	 > -- Open Terminal for **Mac/ *Unix System** or Command Line Prompt for **Windows**
		> -- run ```npm install -g http-server``` in the terminal or command line prompt.
		> -- Wait until the installation is finished, close the window afterwards.

Customisation
-----
To fit on different requirements and data structures, you have to modify the method APICallback in facebook_crawler/crawler_logic.js. For details and demo, see the comment in file.

Run the Program
-----
>  -- Open Terminal or Command Line Prompt
>  -- Change Directory to facebook_crawler by ``cd facebook_crawler``
>  -- Run the server by ``http-server .``
>  -- Open Browser and go to **http://localhost:8080** (If you do **not** use the default Port Number, change the Port Number **8080** to your Port Number)
>  -- Click the "Login" button and finish the login process
>  -- Click the "Run API !!!" button

Notes and Reminder
-----
1.  Open http-server in current directory by terminal before run the crawler 
2.  do not close the terminal when you fetching data.
3.  Allow pop-up windows in browser
4.  Check disable cache in web browser is valid

Reference
----
1. [Basic math in JavaScript — numbers and operators](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math)
2. [MDN Javascript - Useful String Method](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods)
3. [MDN Javascript - Array](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)
4. [JavaScript building blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks)
5. [Working with JSON data](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
[6]: https://developers.facebook.com/docs/apps/register
[7]: https://nodejs.org/en/download/