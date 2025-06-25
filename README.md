# Sample_Core_Plugin_Extension
Standard POD plugin Extension
This document guide you through how to develop a simple pro code extension to the standard 'Assemble Components' POD Plugin, which should be enough to set a strong basis and enable you to extend other core POD Plugins further to address your own plugin extension use cases and other more complex requirements.
Open your Business Application Studio in BTP
Open digital-manufacturing-extension-samples Github, click '<> Code' and copy the web URL from HTTPS tab.
 
Back to SAP Business Application Studio, open a 'Dev Space' (make sure it is in RUNNING state), click 'Clone from Git', paste the web URL that was copied from Github in the previous step and hit 'Enter'.
 
The git repository will be cloned, and once completed, can be opened.
  
To prevent Cross-Origin Resource Sharing (CORS) issues, from the EXPLORER view, open mta.yaml file and replace '<DM_HOST>' with your own SAP Digital Manufacturing tenant host in Line #15.
 
For example, if your SAP Digital Manufacturing tenant url is: "https://XXXXXXX.execution.eu20.dmc.cloud.sap/cp.portal/site#Shell-home", replace '<DM_HOST>' with "XXXXXXX.execution.eu20.dmc.cloud.sap" only.
Back to the EXPLORER view, expand dm-coreplugin-extensions > plugins > webapp > assemblyPointExtensionProvider path and open PluginEventExtension.js, where you can find the events that can be extended for the 'Assemble Components' POD Plugin.
 
Feel free to browse around the other folders for the other plugins, and get familiar with them as well.
In this blog post, I will extend 'ON_ADD_PRESS_EVENT' event from Line #28 above, which is triggered once workers press the 'Add' button in the 'Assemble Components' POD Plugin during Component Assembly steps in Work Center and Operation Activity PODs.
Note that ON_ADD_PRESS_EVENT event returns OverrideExecution.After:
            } else if (sOverrideMember === PluginEventConstants.ON_ADD_PRESS_EVENT) {
                return OverrideExecution.After;
            }
 
Here, you can use:
•	Before: Where your extension is appended before the standard execution flow.
•	After: Where your extension is appended after the standard execution flow.
•	Instead: Where your extension is executed instead of the standard execution flow.
To extend ON_ADD_PRESS_EVENT event, onAddPress function must be extended, which for educational purposes, I extended with a very simple showSuccessMessage() call:


 
Extensions can be enabled for specific POD Plugins, Plants and PODs, enabling flexibility and scalability.
To enable an extension, navigate to dm-coreplugin-extensions > plugins > webapp > designer path and open components.json file to declare the desired POD(s) and Plant(s) where each specific extension should be enabled for:
 
And that´s it! The POD Plugin extension is ready to be deployed.
Deploy it
To deploy the extension, navigate to and right-click mta.yaml file from the EXPLORER view, and select 'Build MTA Project'.
 
Once the build is complete, expand 'mta_archives' folder to find the recently created .mtar build file, right-click it and select 'Deploy MTA Archive'.
 
When doing it for the 1st time only, Sign In to SAP BTP Subaccount Cloud Foundry Environment and select a Target.
 
The Cloud Foundry Endpoint information comes from the SAP BTP Cockpit, see below, and authentication can be done via Credentials or SSO Passcode as you wish.
 
Once Cloud Foundry Sign In is done, select a Cloud Fountry Target, meaning the Organization and Space where the extension will be deployed to, and click 'Apply'.
 
The extension will now be deployed to the SAP BTP Subaccount Cloud Foundry Environment, which might take a few minutes, hang tight.
 
Once completed, you can navigate to the respective SAP BTP Cockpit and check the selected Cloud Foundry Target Space:
 
To find the application deployment as 'Started':
 
If you don´t see it, please go back and review your whole setup.
Enable it
Once deployed, the extension must be enabled in in SAP Digital Manufacturing Service Registry.
To do so, open Manage Service Registry app, select 'UI Extensions' and click 'Create':
 
Enter the 'UI Extension' info accordingly, as shown below.
 
Where:
•	Name: Anything
•	Description: Anything
•	Type: 'POD Plugin'
•	URL: Shows up in SAP Business Application Studio right after the deployment is completed, see below:  
•	Path: Is defined in xs-app.json as 'source', see below:  
•	Namespace: Is defined, for example, in PluginEventExtension.js file (replace "." by "/") 
•	Status: Check as Enabled.
and click 'Create' to create it.
Consume it
Once the 'UI Extension' is created, you can open the very specific POD at the very specific Plant for which you previously enabled the extension for at components.json file, where you should be able to notice two important things:
 
1.	In the POD top right corner, you should see a purple icon, meaning that extensions are active for this POD.
2.	In Developer Console > Sources tab, if you scroll down to the bottom, you should be able to see your plugin extension is properly loaded and available.
If you don´t see both of these, please go back and review your whole setup.
Proceed as normal and navigate to 'Assemble Components' plugin, which was extended in this example, to give it a try.
 
And, as soon as 'Add' button is clicked, you should see the extension being triggered.
 
Please keep in mind that, for educational purposes, in this blog post I covered a very simple extension to the 'Assembly Components' POD Plugin, but these same steps and principles can be used for further extensions and more complex use cases.

