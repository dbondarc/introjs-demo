( function( $, ng, undefined ) {

	/**
	* @module Module Global Services
	* ...
	* ...
	*/	
	var module = ng.module( "demo.intro.data", [ "demo.global" ] );
	/**
	*
	*/
	module.factory( "introsConfigDialer", [ function () {

		var defaultPos = "bottom-middle-aligned" || "auto";

		return {
			mainnav: function() {
				return {
					steps: []
				};
			},
			basicflow: function() {
				return {
					steps: [
						{
							element: ".next-call",
							intro: "<h4>Next Call</h4><p>Use this button to initiate the next call in your Leads queue and power through calls more quickly.</p>",
							position: defaultPos
						},
						{
							element: ".intro-dialer-callstatus",
							intro: "<h4>Call Status</h4><p>While attempting to contact a lead, this field will display the status of your call. Status messages may appear as <strong>Connected</strong>, <strong>Connecting</strong>, <strong>Call Disconnected</strong> or <strong>Call Failed</strong>. </p>",
							position: defaultPos
						},
						{
							element: ".object-info",
							intro: "<h4>Object Info</h4><p>Here you can see specific information relating to the current Lead in your queue including <strong>Full Name</strong>, <strong>Company</strong>, <strong>Contact Number</strong> and <strong>Lead Status</strong>.</p>",
							position: defaultPos
						},
						{
							element: ".btn-transfer",
							intro: "<h4>Transfer Call</h4><p>While a call is in progress, this button will open a transfer menu with options to transfer a waiting Lead.</p>",
							position: defaultPos
						},
						{
							element: ".btn-voicemail",
							intro: "<h4>Send to Voicemail</h4><p>While a call is in progress, this button will trigger the voicemail menu with options to leave a targeted, pre-recorded voice message.</p>",
							position: defaultPos
						},											
						{
							element: ".btn-answer-hang-up",
							intro: "<h4>Click to Dial/End Call</h4><p>This button toggles the \"Dial\"/\"Hang Up\" actions. If you are already on a call, a single click will end the current call, otherwise a new call will be initiated to the current Lead.</p>",
							position: defaultPos
						},	
						{
							element: ".intro-action-container",
							intro: "<h4>Take Action</h4><p>The Take Action dropdown will allow you to specify a call action from a pre-defined list. Submitted actions will appear in the Timeline History panel for the current Lead. A comment textbox will allow you to include relevant notes associated with the selected action.</p>",
							position: defaultPos
						},
						{
							element: ".signalr-indicator-container",
							intro: "<h4>Velocify Connection Status</h4><p>This indicator displays whether you are connected to Velocify. The Velocify Connection Status has three color states: <span style='color:green;'>green</span> indicates \"Connected\", <span style='color:#FDD017;'>yellow</span> indicates \"Connecting\" and <span style='color:red;'>red</span> indicates \"No connection\".</p>",
							position: defaultPos
						},
						{
							element: ".dialer-settings",
							intro: "<h4>Dialer Settings</h4><p>Clicking the gear icon will toggle the Dialer Settings panel. This panel provides additional dialer options for handling <strong>Leads</strong>, <strong>Shotgun</strong>, <strong>Caller ID</strong>, <strong>Cool Off Period</strong>, and <strong>Voicemails</strong>.</p>",
							position: defaultPos
						}
					]
				};
			},
			clickconnect: function() {
				return {
					steps: [
						{
							element: ".next-call",
							intro: "<h4>Next Call</h4><p>Use this button to initiate the next call in your Leads queue and power through calls more quickly.</p>",
							position: defaultPos
						},
						{
							element: ".intro-caller-id",
							intro: "<h4>Caller ID</h4><p>This field will display the phone number you provide in \"Dial-IQ Caller ID\" under Dialer Settings and will be visible to your call recipients.</p>",
							position: defaultPos
						},						
						{
							element: ".click-to-call",
							intro: "<h4>Click to Call</h4><p>Clicking on any phone number with a phone icon next to it will initiate a call to that number.</p>",
							position: defaultPos
						}
					]
				};
			},
			shotgun: function() {
				return {
					steps: [
						{
							element: ".intro-dialer-notification-container",
							intro: "<h4>Shotgun Notification</h4><p>By enabling the switch control in Dialer Settings, you will be eligible to receive immediate attempts to connect you to the next incoming Lead. Selecting \"Yes\" or \"No\" indicates your availability.</p>",
							position: defaultPos
						},
						{
							element: ".dialer-settings",
							intro: "<h4>Dialer Settings</h4><p>Clicking the gear icon will toggle the Dialer Settings panel. This panel provides additional dialer options for handling <strong>Leads</strong>, <strong>Shotgun</strong>, <strong>Caller ID</strong>, <strong>Cool Off Period</strong>, and <strong>Voicemails</strong>.</p>",
							position: defaultPos
						}
					]
				}
			},
			takeaction: function() {
				return {
					steps: [
						{
							element: ".intro-action-container",
							intro: "<h4>Take Action</h4><p>The Take Action dropdown will allow you to specify a call action from a pre-defined list. Submitted actions will appear in the Timeline History panel for the current Lead. A comment textbox will allow you to include relevant notes associated with the selected action.</p>",
							position: defaultPos
						}		
					]
				}
			},
			transfers: function() {
				return {
					steps: [
						{
							element: ".cold",
							intro: "<h4>Cold Transfer</h4><p>This option will assign a waiting cold transfer Lead to specified user or phone number after holding for availability.</p>",
							position: defaultPos
						},
						{
							element: ".warm",
							intro: "<h4>Warm Transfer</h4><p>This option will assign a waiting warm transfer Lead to specified user or phone number after holding for availability.</p>",
							position: defaultPos
						},
						{
							element: ".nohold",
							intro: "<h4>No Hold Transfer</h4><p>This option will assign a waiting transfer Lead to specified user or phone number without holding.</p>",
							position: defaultPos
						}
					]
				}
			},			
			cold: function() {
				return { 
					steps: [
						{
							element: ".enter-phone",
							intro: "<h4>Cold: Enter Phone Number</h4><p>Assigns a cold transfer Lead to a selected phone number.</p>",
							position: defaultPos
						},
						{
							element: ".select-user",
							intro: "<h4>Cold: Select a User</h4><p>Assigns a cold transfer Lead to a selected user.</p>",
							position: defaultPos
						}
					]
				 }
			},
			warm: function() {
				return {
					steps: [
						{
							element: ".enter-phone",
							intro: "<h4>Warm: Enter Phone Number</h4><p>Assigns a warm transfer Lead to a selected phone number.</p>",
							position: defaultPos
						},
						{
							element: ".select-user",
							intro: "<h4>Warm: Select a User</h4><p>Assigns a warm transfer Lead to a selected user.</p>",
							position: defaultPos
						},
						{
							element: ".distro",
							intro: "<h4>Warm: Distribution</h4><p>Places a warm transfer Lead into a distribution queue.</p>",
							position: defaultPos
						}
					]
				}
			},
			nohold: function() {
				return {
					steps: [
						{
							element: ".enter-phone",
							intro: "<h4>No Hold: Enter Phone Number</h4><p>Assigns a no-hold transfer Lead to a selected phone number.</p>",
							position: defaultPos
						},
						{
							element: ".select-user",
							intro: "<h4>No Hold: Select a User</h4><p>Assigns a no-hold transfer Lead to a selected user.</p>",
							position: defaultPos
						},
						{
							element: ".distro",
							intro: "<h4>No Hold: Distribution</h4><p>Places a no-hold transfer Lead into a distribution queue.</p>",
							position: defaultPos
						}
					]
				}
			},
			voicemail: function() {
				return {
					steps: [
						{
							element: ".btn-voicemail",
							intro: "<h4>Send to Voicemail</h4><p>While a call is in progress, this button will trigger the voicemail menu with options to leave a targeted, pre-recorded voice message.</p>",
							position: defaultPos
						},										
						{
							element: ".filter-voicemail-text",
							intro: "<h4>Send voicemail to selected user</h4><p>Based on your voicemail settings, the filter allows you to search for pre-recorded voice messages by name.</p>",
							position: defaultPos
						},											
						{
							element: ".contcall",
							intro: "<h4>Continued voicemail</h4><p>This is a sample of a pre-recorded voice message that can be assigned to a called Lead.</p>",
							position: defaultPos
						},											
						{
							element: ".termcall",
							intro: "<h4>Terminated voicemail</h4><p>This is a sample of a pre-recorded voice message that can be assigned to a called Lead.</p>",
							position: defaultPos
						}
					]
				}
			},
			dialersettings: function() {
				return {
					steps: [
						{
							element: '.intro-settings-leads',
							intro: "<h4>Turn Leads On/Off</h4><p>This switch controls eligibility for new record assignments; It is recommended to switch to <strong>OFF</strong> when available.</p>",
							position: defaultPos
						},
						{
							element: '.intro-settings-shotgun',
							intro: "<h4>Turn Shotgun On/Off</h4><p>This switch controls eligibility to receive immediate attempts to connect you to the next incoming Lead.</p>",
							position: defaultPos
						},
						{
							element: ".intro-settings-phone",
							intro: "<h4>Phone Number</h4><p>This field displays the phone number Velocify will use to connect calls to you.</p>",
							position: defaultPos
						},
						{
							element: ".intro-settings-cid",
							intro: "<h4>Caller Id Settings</h4><p>This field displays the phone number that will be displayed to call recipients when you make calls using Dial-IQ.</p>",
							position: defaultPos
						},
						{
							element: ".intro-settings-sip",
							intro: "<h4>SIP Address Settings</h4><p>If your organization uses SIP addresses, this is the SIP address that Velocify will use to connect calls to you.</p>",
							position: defaultPos
						},
						{
							element: ".intro-settings-cooloff",
							intro: "<h4>Cooloff Settings</h4><p>This sets a length of time that you want to pass before you retry a call to a Lead. If the time period has not elapsed you will receive a warning message.</p>",
							position: defaultPos
						},
						{
							element: ".intro-settings-vm",
							intro: "<h4>Voicemail Settings</h4><p>Opens a new page to create, edit or delete pre-recorded voice messages that can be assigned to Leads.</p>",
							position: defaultPos
						}
					]
				}
			},
		};

	}]);

		
})( jQuery, angular );


