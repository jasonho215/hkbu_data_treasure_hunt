
Client-side Facebook Graph API Fetcher
======
This is a client-side fetcher for HKBU Data Treasure Hunt Competition.

-----

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
	4. Open Terminal for **Mac/ *Unix System** or Command Line Prompt for **Windows**
	5. Run ```npm install -g http-server``` in the terminal or command line prompt.
	6. Wait until the installation is finished, close the window afterwards.

----------

Modification
-----
#### Open the project
1. Open Visual Studio Code
2. Open the project (Perform either one following routines)
	3. **_For First Use:_**
		4. In the Welcome Page, Click the ``Clone Git Repository`` which is under the tab ``Start``
		4. Paste the Git repository link to the pop-up at the top of the window
		5. Press Enter,  then select the location for storing the files in local machine.
		6. Click Confirm/ OK button, then wait until the cloning is finished.
	7. **_Reopen the files:_**
		8. Click the Name of this Repository (hkbu_data_treasure_hunt) under the tab ``Recent``

#### Things that you have to make changes
#####**Constants**
In _facebook_crawler/config.js_, you have to modify:
|	constant name	|	description	|
|	--------:					|	:----------			|
|	appId					|	The Facebook application ID listed on the Facebook Application Page **(MUST)** |
|	stopWords			|	Words you want to filter out from the messages fetched from Facebook Graph API	|
|	tokenAccessRight	|	Rights required for getting data. You can test on the Facebook Graph API Explorer first.	|
|	targetMessageNumber	|	The maximum number of message that you want to collect	|

In _facebook_crawler/crawler_logic.js_, you have to modify:
|	constant name	|	description	|
|	---------:					|	:----------			|
|	apiPath				|	Facebook Graph API Path. You may test it in the Graph API Explorer and then copy request link field to replace	|

##### **Method**
To fit on different requirements and data structures, you have to modify the method ``APICallback`` in _facebook_crawler/crawler_logic.js_. For details and demo, see the comments in file.

Run the Program
-----
1. Open Terminal or Command Line Prompt
2. Change Directory to facebook_crawler by ``cd facebook_crawler``
3. Run the server by ``http-server .``
4. Open Internet Browser (Preferred: Google Chrome) and go to **http://localhost:8080** (If you do **not** use the default Port Number, change the Port Number **8080** to your Port Number)
5. Click the "Login" button and finish the login process
6. Click the "Run API !!!" button

-----

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