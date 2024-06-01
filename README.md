Disclaimer

This project is an open source project that aims to build a DNS over HTTPS (DoH) forwarding service using Cloudflare's Worker functionality. 

The purpose of this project is to promote network privacy and security, and provide users with more secure and privacy-protected DNS resolution services. However, users of this project are subject to the following disclaimers:

1.This project is for technical research and personal use only, and shall not be used for any purpose that violates laws and regulations or infringes on the rights and interests of others.

2.This project uses Cloudflare's Worker functionality as infrastructure, but is not officially maintained or endorsed by Cloudflare, and Cloudflare is not responsible for any damages caused by this project.

3.the authors and contributors to this project are not responsible for any losses or problems resulting from the use of this project, including but not limited to data loss, service interruptions, network security issues, etc.

4.Any individual or organization should comply with the Internet-related laws and regulations when using this project and take full responsibility for their own actions.

5.If any person or organization uses this project to harm Cloudflare's interests or violates its terms of service, it has nothing to do with the authors and contributors of this project, and all legal responsibilities shall be borne by the perpetrators themselves.

Users are requested to read and understand the above disclaimer carefully before using this program, and if there is no objection, they are deemed to agree to and comply with all the provisions of this statement.

User Guide: Creating an Encrypted DNS Worker on Cloudflare

Step 1: Create a Worker on Cloudflare

Log in to your Cloudflare account and go to the Dashboard. Select Workers from the navigation bar at the top of the Dashboard. Click on the Create a Worker button.

Step 2: Copy the code from doh-cf-worker.js to the Worker Open the project on GitHub and locate the doh-cf-worker.js file. Copy all the code from the file (Ctrl+C or Command+C). Go back to the Cloudflare Worker editor and paste the code into the code editor (Ctrl+V or Command+V). After ensuring the code is correct, click Save and Deploy to save and deploy the Worker.

Step 3: Bind a Custom Domain In the Cloudflare Worker editor, click on the Route tab. In the Route section of the Route Configuration page, click Add Route. Enter your custom domain, for example, example.com. In the Route field, enter /dns-query so that requests will be sent to the Worker's /dns-query path. Click Save to save the settings. Using Encrypted DNS: Open the settings menu in your browser and navigate to the DNS settings. Enter your custom domain and /dns-query path, for example, example.com/dns-query. After saving the settings, your browser will use the encrypted DNS service provided by Cloudflare Worker. If you need further assistance or encounter any issues, please contact the Cloudflare support team or refer to the Cloudflare documentation.
