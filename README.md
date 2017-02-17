
Client-side Facebook Graph API Fetcher
======
This is a client-side fetcher for HKBU Data Treasure Hunt Competition.

Prerequisite
-----
1.  Goto [here][6] to setup a facebook developer account and setup a facebook application
2.  Enable **facebook login** in **Product** category in Facebook Application page.
3.  In **facebook login** (under the Facebook Application page), add "localhost:PORT_NUM" to **Vaild OAuth redirect URL** field. By default, the PORT_NUM is **8080**.

software needed
-----
Install the software in the following order

[node.js engine LTS version] [7] (Based on System Architecture)
[Visual Studio Code](https://code.visualstudio.com/Download)
npm package -- http-server
	 	 > -- Open Terminal for **Mac/ *Unix System** or Command Line Prompt for **Windows**
		> -- run ```npm install -g http-server``` in the terminal or command line prompt.
		> -- Wait until the installation is finished, close the window afterwards.

Customisation
-----
To fit on different requirement and data structure, you have to modify the method APICallback in facebook_crawler/crawler_logic.js. For details and demo, see the comment in file.

Run the Program
=====
> Open Terminal or Command Line Prompt
> Change Directory to facebook_crawler by ``cd``
> run the server by ``http-server .``
> Open Browser and go to **http://localhost:8080**
> Click the Login button and finish the login process
> Click the Run API !!! button

Notes and Reminder
-----
1.  Open http-server in current directory by terminal before run the crawler 
2.  do not close the terminal when you fetching data.
3.  Allow pop-up windows in browser
4.  Check disable cache in web browser is valid

> Written with [StackEdit](https://stackedit.io/).

[1]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math "Basic math in JavaScript — numbers and operators"
[2]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods "Useful String Method"
[3]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays "Array"
[4]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks "JavaScript building blocks"
[5]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON "Working with JSON data"
[6]: https://developers.facebook.com/docs/apps/register
[7]: https://nodejs.org/en/download/