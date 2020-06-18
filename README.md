# tf2autobot

A free and open source fully automated TF2 trading bot advertising on www.backpack.tf using prices from www.prices.tf.
**tf2autobot** is an improved version of the original **tf2-automatic** made by [Nicklason](https://github.com/Nicklason). You can find out more on the original repository [here](https://github.com/Nicklason/tf2-automatic).

![GitHub package version](https://img.shields.io/github/package-json/v/idinium96/tf2autobot.svg)
[![Build Status](https://img.shields.io/github/workflow/status/idinium96/tf2autobot/CI/development)](https://github.com/idinium96/tf2autobot/actions)
[![GitHub issues](https://img.shields.io/github/issues/idinium96/tf2autobot)](https://github.com/idinium96/tf2autobot/issues)
[![GitHub forks](https://img.shields.io/github/forks/idinium96/tf2autobot)](https://github.com/idinium96/tf2autobot/network/members)
[![GitHub stars](https://img.shields.io/github/stars/idinium96/tf2autobot)](https://github.com/idinium96/tf2autobot/stargazers)
[![Discord](https://img.shields.io/discord/664971400678998016.svg)](https://discord.gg/ZrVT7mc)
![License](https://img.shields.io/github/license/idinium96/tf2autobot)
[![Donate-paypal](https://img.shields.io/badge/paypal-donate-blue)](https://www.paypal.me/idinium)
[![Donate-steam](https://img.shields.io/badge/steam-donate-lightgrey)](https://bit.ly/3gbldTM)

Before you install the bot, there are a few things you need to have taken care off before you will be able to run the bot.

- You need a separate Steam account with a mobile authenticator. I suggest using the [Steam Desktop Authenticator](https://github.com/Jessecar96/SteamDesktopAuthenticator) to authenticate the account and get the secret keys used to automate generating 2FA codes and managing mobile confirmations.
- NodeJS version 8 or more
- Typescript 3.7 or above

Please refer to the [wiki](https://github.com/idinium96/tf2autobot/wiki) for setting up the bot. For additional help and questions, please ask in the IdiNium's Trading Bot [Discord server](https://discord.gg/ZrVT7mc) or create an [issue](https://github.com/idinium96/tf2autobot/issues/new/choose).

## Download and installation

You can clone or download the bot by clicking on the green button in the top right, follow the [installation guide](https://github.com/idinium96/tf2autobot/wiki/a.-Installation) for more instructions.

## Configuration

Once you have downloaded the source and installed the necessary packages, you can move on to configuring the bot. Follow the [configuration guide](https://github.com/idinium96/tf2autobot/wiki/b.-Configuration).

## Difference between tf2autobot and tf2-automatic

The original tf2-automatic repository already have a lot of features, but some features in this version have their own advantages. Let me list out what features that worth mentioning, which already exist and what features that have been added into this version:

### Original tf2-automatic
- free autoprice (use prices from [prices.tf](https://prices.tf/)) and unlimited listings (depends on your backpack.tf listings cap)
- automatically craft/smelt pure metals (for currency changes)
- offer review (on invalid value/item or overstocked or duped items)
- dupe check on items that are more than minimum keys (you set it yourself)

### tf2autobot version
- add an option to use Discord Webhook for your bot to send accepted trade summary
- add an option to disable show only metal in trade summary (it will show x keys, y ref, it will show only x ref on original version)
- add an option to enable Autokeys (to keep your refined metal stock) and key banking ([jump](https://github.com/idinium96/tf2autobot#autokeys-auto-buy-or-sell-keys-feature))
- add an option to set your own custom greeting/success/failed messages and offer review notes
- send to trade partner a summary of their offer if need to be reviewed ([jump](https://github.com/idinium96/tf2autobot#offer-review-summary-on-trade-partner-side))
- alert admins when there's something wrong, like queue problem (which the original one is still not fixed yet, and I have no idea why) and when your bot is out of space or if your bot has less than minimum pure (must enable Autokeys feature)
- use emojis on almost all messages
- add an option to set all craft weapons as currency (0.05 ref)
- INVALID_VALUE exception
- and more to come!

## Added features

### Discord Webhook feature

Instead of the bot sending trade summary, review offer and messages to you via Steam Chat, this version will let your bot to send it to a different channels in your discord server.

Screenshots:
- Trade summary (or live-trades) -

![trade-summary](https://user-images.githubusercontent.com/47635037/84581315-9de69480-ae12-11ea-806f-2408bfb4b5b9.PNG)

- Offer review (when trade partner sent wrong value/overstocked/etc) -

![Offer-review](https://user-images.githubusercontent.com/47635037/84581314-9d4dfe00-ae12-11ea-88e2-9a65369b4e22.png)

- Messages (when trade partner send "!message" command -

![Messages](https://user-images.githubusercontent.com/47635037/84581313-9cb56780-ae12-11ea-9dcf-2d660d8ae184.PNG)

- Price update (Discord Only) - Show price change for every items that are on your pricelist -

![price-update](https://user-images.githubusercontent.com/47635037/83712639-cc1ce500-a658-11ea-855d-5de43b39ff2f.png)

You can also only set it to send only trade summary, but the others like Offer review and messages will be sent to you via Steam Chat.

Note that, it's an option to show key rate/ pure stock/ quick links on each feature.

If you want to use this feature, you must use [ecosystem.template.json](https://github.com/idinium96/tf2autobot/blob/master/template.ecosystem.json) from this version, which contains much more variables for you to fill in.

### Autokeys (auto buy or sell keys) feature

This feature when enabled, your bot will automatically buy or sell keys based on your bot pure availability and your settings on this feature. You'll have to set your minimum/maximum keys and minimum/maximum refined metals in your ecosystem.json - more explaination can be found [here](https://github.com/idinium96/tf2autobot/#your-bot-settings) starting on `ENABLE_AUTO_SELL_AND_BUY_KEYS` until `MAXIMUM_REFINED_TO_STOP_SELL_KEYS`.

Some screenshots:
- When your bot have enough key to sell to get more ref (if your ref is less than minimum) OR enough ref to buy more keys (when your ref > maximum and keys < max)

![autokeys1](https://user-images.githubusercontent.com/47635037/84581306-9a530d80-ae12-11ea-9bd5-3a988ac447d9.png)
![autokeys2](https://user-images.githubusercontent.com/47635037/84581309-9b843a80-ae12-11ea-8374-0f7d3c631fa6.png)


- When your bot don't have enough of what I've said before:

![autokeys3](https://user-images.githubusercontent.com/47635037/84581310-9c1cd100-ae12-11ea-80fa-085ad8bff73e.png)

You can see codes on how this feature works [here](https://github.com/idinium96/tf2autobot/blob/master/src/classes/MyHandler.ts#L1129-L1592).

### Emojis and more commands added

![commands](https://user-images.githubusercontent.com/47635037/84581311-9c1cd100-ae12-11ea-8aae-29733d9e0334.PNG)

### Offer review summary on trade partner side

![review-note-trade-partner](https://user-images.githubusercontent.com/47635037/84629412-d1ade100-af1c-11ea-9a9d-a9c5df6b8eb3.PNG)

### INVALID_VALUE exception

Let say you want to trade an unusual OR an australium, which the value as we know is huge (more than 5 keys), and then someone sent a trade offer with 0.11 ref less, your bot will skip this offer and send you notification to do review on this offer. With this exception, your bot will accept the trade as long as it's less than the exception value in ref that you've set. To use this feature, you'll need to set it on both `INVALID_VALUE_EXCEPTION_SKUS` and `INVALID_VALUE_EXCEPTION_VALUE_IN_REF`. See [here](https://github.com/idinium96/tf2autobot#manual-review-settings).

![Invalid_value_exception1](https://user-images.githubusercontent.com/47635037/84966884-38adde80-b145-11ea-9aac-d28daf9a74e6.PNG)

![Invalid_value_exception2](https://user-images.githubusercontent.com/47635037/84966887-39df0b80-b145-11ea-9d81-021d302e7cf0.PNG)


## Variables in ecosystem.json summary

### Your bot credentials
- `STEAM_ACCOUNT_NAME`: username that is used to login (preferably your bot/alt Steam account).
- `STEAM_PASSWORD`: your bot Steam account password.
- `STEAM_SHARED_SECRET`: you can found this in `<Your Bot SteamID64>.maFile` inside ~/SDA/maFiles (named `shared_secret`).
- `STEAM_IDENTITY_SECRET`: same as above (named `identity_secret`).

### Prices.TF token
- `PRICESTF_API_TOKEN`: You can leave this empty. No need at all.

### Backpack.tf token and API Key
You can run your bot without this first, which then on the first run, it will print out your bot backpack.tf access token and apiKey. You'll need to copy and paste it into your ecosystem.json or .env file, [see this image](https://cdn.discordapp.com/attachments/697415702637838366/697820077248086126/bptf-api-token.png), BUT if you want to find it yourself, then,
- `BPTF_ACCESS_TOKEN`: https://backpack.tf/connections and click on `Show Token` under User Token.
- `BPTF_API_KEY`: https://backpack.tf/developer/apikey/view - fill in site URL (`http://localhost:4566/tasks`) and comments (`Check if a user is banned on backpack.tf`).

### Your bot settings
- `AUTOBUMP`: If you don't have backpack.tf premium, then your bot will re-list all listings every 30 minutes.

- `MINIMUM_SCRAP`: [Number] Default is 9 scraps. If it has less, it will smelt reclaimed metal so your bot will have more than minimum scraps.
- `MINIMUM_RECLAIMED`: [Number] Default is 9 Reclaimed. Explained above.
- `METAL_THRESHOLD`: [Number] Default is 9, if scraps/reclaimed metal reached minimum + threshold (max), it will combine the metal.

#### Autokeys feature
- `ENABLE_AUTO_SELL_AND_BUY_KEYS`: [true|false] Default is false. If you set to true, the bot will automatically sell/buy keys based on the availability of the refined metals and keys in your bot inventory. Set it to false if you want to custom price your key.
- `ENABLE_AUTO_KEY_BANKING`: [true|false] Default is false. If set to true, it will do key banking (must also set **ENABLE_AUTO_SELL_AND_BUY_KEYS** to true and for banking, meaning if current ref is in between min and max and keys > min, it will do key banking).
- `MINIMUM_KEYS`: [Number] When current keys > minimum keys, it will start selling keys (with when current ref < minimum ref), else it will stop selling keys.
- `MAXIMUM_KEYS`: [Number] When current keys < maximum keys, it will start buying keys (with when current ref > maximum ref), else it will stop buying keys.
- `MINIMUM_REFINED_TO_START_SELL_KEYS`: [Number] - Already explained.
- `MAXIMUM_REFINED_TO_STOP_SELL_KEYS`: [Number] - Already explained.

**This feature is meant to make your bot to have enough pure in their inventory. Enabling Autokeys - Banking might cause your bot to not function as intended.

#### Set to true if want to disable
- `DISABLE_INVENTORY_SORT`: [true|false] Default: true. Sort your bot inventory.
- `DISABLE_LISTINGS`: [true|false] Default: false. This is used if you want to temporarily disable trading while your bot is alive.
- `DISABLE_CRAFTING`: [true|false] Default: false. **NOT RECOMMENDED** to set is as true, as it cause bot and trade partner to not be able to trade because of missing pure changes.
- `DISABLE_MESSAGES`: [true|false] Default: false. When true, people (that are friend with your bot) can send messages with "!message" command.
- `DISABLE_SOMETHING_WRONG_ALERT`: [true|false] - Default: false. My custom - Used to notify owner if your bot has a queue problem/full inventory/low in pure (if Autokeys is on).
- `DISABLE_CRAFTWEAPON_AS_CURRENCY`: [true|false] - Default: false. Set it as true if you don't want to set craft weapons as currency (only support for trade offer that your bot will receive, not when your bot send an offer to the trade partner via chat.)

#### Misc feature
- `TRADES_MADE_STARTER_VALUE`: [Number] - Used mainly for displaying your bot total trades made, found in your bot Steam Profile page (leave it 0 if you don't care about it, used for discord webhook).
- `LAST_TOTAL_TRADES`: [Number] - Used if your polldata.json is getting bigger which consumed a lot of RAM, but you want to keep total successful trades that your bot has made (leave it 0 if you don't care about it).
- `TRADING_STARTING_TIME_UNIX`: [Number - Unix format] - Also same as LAST_TOTAL_TRADES, but this one is the latest time (leave it 0 if you don't care about it). You can read more on my [Discord server post](https://discordapp.com/channels/664971400678998016/666909518604533760/707706994932449410).

#### Duped unusual check feature
- `ENABLE_SHOW_ONLY_METAL`: [true|false] - Default: true. My custom - If set to false, it will show [x keys, y ref].
- `ENABLE_DUPE_CHECK`: [true|false] - Default: true. Used to enable/disable check on duped unusuals
- `DECLINE_DUPES`: [true|false] - Default: false. Explained itself.
- `MINIMUM_KEYS_DUPE_CHECK`: [Number] - Default: 10. Explained itself.

#### Set to true if want to skip
- `SKIP_BPTF_TRADEOFFERURL`: [true|false] - Default: true. Not sure why this thing might not work. Please add trade offer URL by yourself [here](https://backpack.tf/settings##general) (login as your bot Steam account).
- `SKIP_ACCOUNT_LIMITATIONS`: [true|false] - Default: false. Used to check your account limitation. It's better to set to true if your bot Steam account already a [premium account](https://support.steampowered.com/kb_article.php?ref=3330-IAGK-7663).
- `SKIP_UPDATE_PROFILE_SETTINGS`: [true|false] - Default: false. This is just set your bot profile to public, so backpack.tf can load your bot inventory and etc correctly. If you already set all to public, just set this to true.

#### Your time
Time will be use in "!time" command and 
- `TIMEZONE` - Please only use these [Timezone Format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), for example "Asia/Kuala_Lumpur".
- `CUSTOM_TIME_FORMAT` - Please refer [this article](https://www.tutorialspoint.com/momentjs/momentjs_format.htm). Default is `MMMM Do YYYY, HH:mm:ss ZZ`.
- `TIME_ADDITIONAL_NOTES` - Your additional note when the bot show your current time, such as your active hours, etc.

#### Set to true if want to allow
- `ALLOW_ESCROW`: [true|false] - Default: false. Escrow = trade hold
- `ALLOW_OVERPAY`: [true|false] - Default: true. If people give an overpay, your bot will accept. Set it to false if you don't want.
- `ALLOW_BANNED`: [true|false] - Default: false. I think it's better to set as false.

#### Set time for price to be updated in seconds
- `MAX_PRICE_AGE`: [Number - in seconds] - Default: 28800 - If the time recorded in your pricelist reach/more than this, it will triggered to check with prices.tf.

#### Compulsory variables
- `ADMINS`: [Array] - Put your main SteamID64. Example - `["76561198013127982"]`, if you have multiple, `["76561198013127982", "76561198077208792"]`
- `KEEP`: [Array] - Same as ADMINS, you must fill in BOTH.
- `GROUPS`: [Array] - If you have Steam group, find your group ID and paste it here.
- `ALERTS`: [Array] - If you set to `["trade"]`, your bot will send message/discord webhook every time a successful trades were made, other option is `["none"]`.

#### Set to true if want to enable debugging notes in console
- `DEBUG`: [true|false] - Used to debug if any problem occured.
- `DEBUG_FILE`: [true|false] - Same as above, but this will create a file which can be sent to [issue](https://github.com/idinium96/tf2autobot/issues/new/choose).

#### Backpack.tf sell or buy order listings note on all items in pricelist
- `BPTF_DETAILS_BUY`: [string] - Your buy order message. It will do for all items. available parameters: %name% (print out item name), %price% (item current buying price), %current_stock%, %max_stock% and %keyPrice% (print out: `Key rate: x ref/key`).
- `BPTF_DETAILS_SELL` [string] - Same as buy order, except have %amount_trade% parameter.

#### Custom offer message
- `OFFER_MESSAGE`: [string] - Message that will appear when bot sends offer to trade partner. If leave empty (""), it will print *Powered by tf2-automatic* by default.

### Discord Webhook Configuration
#### Basic configuration on your embed preferences/appearances
- `DISCORD_OWNER_ID` - Right click on yourself and click `Copy ID` and paste here. Make sure to enable developer mode on your Discord settings > Appearance > Advanced.
- `DISCORD_WEBHOOK_USERNAME` - Your Discord Webhook name, example: ※Fumino⚡
- `DISCORD_WEBHOOK_AVATAR_URL` - Your Discord Webhook Avatar, must be in URL form. Example: https://gyazo.com/421792b5ea817c36054c7991fb18cdbc
- `DISCORD_WEBHOOK_EMBED_COLOR_IN_DECIMAL_INDEX` - Embed color, you can found yours at [spycolor.com](https://www.spycolor.com/) and copy the one that said "has decimal index of: `take the value here`". Example: "9171753" for #8bf329 color.

**Note on How to get DISCORD_WEBHOOK_X_URL** - See this: https://gyazo.com/539739f0bab50636e20a0fb76e9f1720 (settings in your respective channels)
#### Queue alert
- `DISABLE_DISCORD_WEBHOOK_SOMETHING_WRONG_ALERT`: [true|false] - Same as `DISABLE_SOMETHING_WROMG_ALERT`, but if set to false, it will be sent to Discord Webhook instead of Steam Chat.
- `DISCORD_WEBHOOK_SOMETHING_WRONG_ALERT_URL` - Discord Webhook URL for SOMETHING_WROMG_ALERT.

#### Pricelist update
- `DISABLE_DISCORD_WEBHOOK_PRICE_UPDATE`: [true|false] - Used to display price updates on the items that are in your pricelist.
- `DISCORD_WEBHOOK_PRICE_UPDATE_URL` - Discord Webhook URL for PRICE_UPDATE.
- `DISCORD_WEBHOOK_PRICE_UPDATE_ADDITIONAL_DESCRIPTION_NOTE` - You can add note there, or just leave it empty.

#### Successful trade summary
- `DISABLE_DISCORD_WEBHOOK_TRADE_SUMMARY`: [true|false] - Used to display every successful trade summary on your trade summary/live-trades channel. If set to false, it will send to your Steam Chat.
- `DISCORD_WEBHOOK_TRADE_SUMMARY_URL` - Discord Webhook URL for TRADE_SUMMARY.
- `DISCORD_WEBHOOK_TRADE_SUMMARY_SHOW_QUICK_LINKS`: [true|false] - Show trade partner quick links to their Steam profile, backpack.tf and SteamREP pages.
- `DISCORD_WEBHOOK_TRADE_SUMMARY_SHOW_KEY_RATE`: [true|false] - self explained.
- `DISCORD_WEBHOOK_TRADE_SUMMARY_SHOW_PURE_STOCK`: [true|false] - self explained.
- `DISCORD_WEBHOOK_TRADE_SUMMARY_ADDITIONAL_DESCRIPTION_NOTE` - Notes.
- `DISCORD_WEBHOOK_TRADE_SUMMARY_MENTION_OWNER` [true|false] - Set it to true if you want your bot to mention on every successful trades.
- `DISCORD_WEBHOOK_TRADE_SUMMARY_MENTION_OWNER_ONLY_ITEMS_SKU` [StringArray] - Support multiple items sku, let say you want to be mentioned on every unusual and australium trades, just do `[";5;u", ";11;australium"]`, or if you want to mention on specific item, just fill in the full item sku like `["725;6;uncraftable"]`, then to add more, just separate it with a comma between each sku string.

#### Offer review summary
- `DISABLE_DISCORD_WEBHOOK_OFFER_REVIEW`: [true|false] - Used to alert you on the trade that needs for offer review via Discord Webhook. If set to false, it will send to your Steam Chat.
- `DISCORD_WEBHOOK_REVIEW_OFFER_URL` - Discord Webhook URL for REVIEW_OFFER.
- `DISCORD_WEBHOOK_REVIEW_OFFER_SHOW_QUICK_LINKS`: [true|false] - Show trade partner quick links to their Steam profile, backpack.tf and SteamREP pages.
- `DISCORD_WEBHOOK_REVIEW_OFFER_SHOW_KEY_RATE`: [true|false] - self explained.
- `DISCORD_WEBHOOK_REVIEW_OFFER_SHOW_PURE_STOCK`: [true|false] - self explained.

#### Messages
- `DISABLE_DISCORD_WEBHOOK_MESSAGE_FROM_PARTNER`: [true|false] - Used to alert you on any messages sent from trade partner. If set to false, it will send to your Steam Chat.
- `DISCORD_WEBHOOK_MESSAGE_FROM_PARTNER_URL` - Discord Webhook URL for MESSAGE_FROM_PARTNER.
- `DISCORD_WEBHOOK_MESSAGE_FROM_PARTNER_SHOW_QUICK_LINKS`: [true|false] - Show trade partner quick links to their Steam profile, backpack.tf and SteamREP pages.

### Manual Review settings
- `ENABLE_MANUAL_REVIEW`: [true|false] - Set to true if you want any INVALID_VALUE/INVALID_ITEMS/OVERSTOCKED/DUPED_ITEMS/DUPE_CHECK_FAILED trades to be reviewed by you.
- `DISABLE_REVIEW_OFFER_NOTE`: [true|false] - If set to false, it will show note on [each error](https://github.com/idinium96/tf2autobot/blob/master/src/classes/MyHandler.ts#L1025-L1059)
- `DISABLE_SHOW_CURRENT_TIME`: [true|false] - If set to false, it will show owner time on offer review notification that trade partner will received.
- `INVALID_VALUE_EXCEPTION_SKUS` [StringArray] - An array of sku that will skip Invalid value if the difference between our and their value is not more than exception value in ref. Let say you want to trade an unusual, but then someone sent an offer with 0.11 ref less, but you want your bot to accept it anyway if it's less than 10 ref, so the trade will be accepted. By default, it will check only for any unusual and australium: `[";5;u", ";11;australium"]`, you can also leave it empty (`[""]`) so all with invalid value will be notified.
- `INVALID_VALUE_EXCEPTION_VALUE_IN_REF` [Number] - Exception value for the sku(s) that you set above. Default is `0`.
- `INVALID_VALUE_NOTE` - Your custom INVALID_VALUE note.
- `INVALID_ITEMS_NOTE` - Your custom INVALID_ITEMS note.
- `OVERSTOCKED_NOTE` - Your custom OVERSTOCKED note.
- `DUPE_ITEMS_NOTE` - Your custom DUPE_ITEMS note.
- `DUPE_CHECK_FAILED_NOTE` - Your custom DUPE_CHECK_FAILED note.
- `ADDITIONAL_NOTE` - Your custom ADDITIONAL note.

### Others
- `CUSTOM_WELCOME_MESSAGE` - Your custom WELCOME_MESSAGE note.
- `CUSTOM_I_DONT_KNOW_WHAT_YOU_MEAN` - Your custom note when people sends wrong command.
- `CUSTOM_HOW2TRADE_MESSAGE` - Your custom HOW2TRADE note.

- `CUSTOM_SUCCESS_MESSAGE` - Your custom SUCCESS note.
- `CUSTOM_DECLINED_MESSAGE` - Your custom DECLINED note.
- `CUSTOM_TRADED_AWAY_MESSAGE` - Your custom note when the bot failed to trade because the item is traded away.
- `CUSTOM_CLEARING_FRIENDS_MESSAGE` - Your custom note when the bot is removing friend to add someone else.
