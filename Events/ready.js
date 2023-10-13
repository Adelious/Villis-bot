const { Events, ActivityType } = require('discord.js');
const axios = require('axios');

const { serverStatusChannelId } = require('../config.json');

const serverUrl = 'https://villis.fr';
const serverUrl1 = 'https://panel.villis.fr';

const emojiUp = '🟢';
const emojiDown = '🔴';

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await console.log(`Ready! Logged in as ${client.user.tag}`);

		await client.user.setPresence({
			activities: [{
				name: 'shop.villis.fr',
				type: ActivityType.Playing,
			}],
			status: 'dnd',
		  })

		  async function checkServerStatus() {
			client.channels.cache.get(serverStatusChannelId).bulkDelete('2')

			try {
			  const response = await axios.get(serverUrl);
			  if (response.status === 200) {
				
				client.channels.cache.get(serverStatusChannelId).send(`${emojiUp} Site web`);
			  } else {
				
				client.channels.cache.get(serverStatusChannelId).send(`${emojiDown} Site web`);
			  }
			} catch (error) {
			  
			  client.channels.cache.get(serverStatusChannelId).send(`${emojiDown} Site web.`);
			}
			try{
			const response = await axios.get(serverUrl1);
			if (response.status === 200) {
			  
			  client.channels.cache.get(serverStatusChannelId).send(`${emojiUp} node FR1`);
			} else {
			  
			  client.channels.cache.get(serverStatusChannelId).send(`${emojiDown} node FR1`);
			}
		  } catch (error) {
			
			client.channels.cache.get(serverStatusChannelId).send(`${emojiDown} node FR1.`);
		  }

		  }
		
		  checkServerStatus();
		
		  setInterval(checkServerStatus, 10 * 60 * 1000); // 10 minutes en millisecondes
	},
};
