const link = "https://www.impfen-sh.de/sh/start/termine?mt=eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0IjoibXQiLCJpIjoic2giLCJjIjpbeyJmaXJzdE5hbWUiOiJJbGthIiwiYmlydGhkYXRlIjoiMjMuMDIuMTk2NiIsInRhZyI6WyJnMSJdLCJpZCI6MH1dLCJlIjoiaW5mb0BtYW5kYW50ZW5wbHVzLmRlIiwiaWF0IjoxNjE5MTgwNzY1LCJleHAiOjE2MTkxODc5NjV9.AXWbpVO9umIWA0adXGXE9tvvhunn_mMe5Ne8j_wC-7ghTRz9Pp4VOwPayKZY48kQ5B3f7c5EeHEm5M4gqHnQ6k_hAVzfs8NSUN42AUUVJJizdWNPr0JaNraoBHmnsTxTorHI6qiDf1XT-s2O5iiCRl4BhO1BaTOvJUZC00bhIkyaLVeK"

const locations = [
    {
        name:"Steinburg, 25524 Itzehoe",
        wunschLocation:false
    },
    {
        name:"Rendsburg-Eckernförde 1, 24214 Gettorf",
        wunschLocation:false
    },
    {
        name:"Kiel 1, 24103 Kiel",
        wunschLocation:false
    },
    {
        name:"Neumünster, 24537 Neumünster",
        wunschLocation:false
    },
    {
        name:"Lübeck, 23554 Lübeck",
        wunschLocation:false,
        url:"https://www.impfen-sh.de/sh/a/5fe20703bc18f205531ff016/s/5fe9e97eb482ab39a0b14f0d?lang=en"
    },
    {
        name:"Ostholstein 1, 23701 Eutin",
        wunschLocation:false
    },
    {
        name:"Plön 1, 24217 Schönberg i.H.",
        wunschLocation:false
    },
    {
        name:"Flensburg, 24944 Flensburg",
        wunschLocation:false
    },
    {
        name:"Herzogtum Lauenburg 1, 23881 Alt-Mölln",
        wunschLocation:false
    },
    {
        name:"Nordfriesland 1, 25813 Husum",
        wunschLocation:false
    },
    {
        name:"Stormarn 1, 23843 Bad Oldesloe",
        wunschLocation:false
    },
    {
        name:"Segeberg 2, 24568 Kaltenkirchen",
        wunschLocation:false
    },
    {
        name:"Dithmarschen 2, 25541 Brunsbüttel",
        wunschLocation:false
    },
    {
        name:"Herzogtum Lauenburg 2, 21502 Geesthacht",
        wunschLocation:false
    },
    {
        name:"Nordfriesland 2, 25899 Niebüll",
        wunschLocation:false
    },
    {
        name:"Ostholstein 2, 23738 Lensahn",
        wunschLocation:false,
        url:"https://www.impfen-sh.de/sh/a/5fe207c48d61ce7b0d74fa16/s/602ba2aae1eeb33c7d9e10e3?lang=en"
    },
    {
        name:"Plön 2, 24306 Plön",
        wunschLocation:false
    },
    {
        name:"Segeberg 3, 22846 Norderstedt",
        wunschLocation:false
    },
    {
        name:"Rendsburg-Eckernf. 2, 24782 Büdelsdorf",
        wunschLocation:false
    },
    {
        name:"Ostholstein 3, 23611 Bad Schwartau",
        wunschLocation:false
    },
    {
        name:"Stormarn 2, 22927 Großhansdorf",
        wunschLocation:false
    },
    {
        name:"Schleswig-Flens. 2, 24392 Norderbrarup",
        wunschLocation:false
    },
    {
        name:"Stormarn 3, 21465 Reinbek",
        wunschLocation:true
    },
    {
        name:"Pinneberg 2, 25337 Elmshorn",
        wunschLocation:false
    },
    {
        name:"Segeberg 1, 23812 Wahlstedt",
        wunschLocation:false
    },
]

const selectors = {
    keine_termine_verfuegbar: "#app__wrapper > div > main > div > div > main > div.userflow.shadow.panel > div.panel__body > div > h2",
    termin_btn: "#app__wrapper > div > main > div > div > main > div.userflow.shadow.panel > div.panel__body > div.page-event-list__cards > div > div > div.card__content > a.right.btn > div",
    termin_reservieren: "#app__wrapper > div > main > div.page-series__container > div:nth-child(4) > div > div.panel__body > div:nth-child(2) > ul > li > div.series-event-list__item-action > button > div",
    location_name: "#app__wrapper > div > main > div > div > main > div.userflow.shadow.panel > div.panel__body > div.page-event-list__cards > div > div > div.card__content > a.card__title",
    no_dates:"#app__wrapper > div > main > div > div:nth-child(4)"
}



const awaitAndClick = async (page,e) => {
    await page.waitForSelector(e, {visible: false})
    await page.waitForTimeout(50)
    await page.click(e);
}

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality

const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

run = async () => {
    const browser = await puppeteer.launch({
        headless: false, 
        args: [
            '--no-sandbox'


            ,`--window-size=${1850},${900}`
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1850, height: 900 });
    await page.goto(link);
    
    
    
    await page.goto("https://www.impfen-sh.de/sh/a/5fe2078d8d61ce7b0d74fa0e/s/602bb951d72359190fc4ca6b?lang=en");
    

    // await waitForAppointment(page)
    await waitForReservieren(page)
    
    // await awaitAndClick(page,selectors.termin_reservieren)  

    await page.waitForTimeout(15*60*1000)

    await browser.close();

}


const waitForAppointment = async (page) => {
    const foundElement = await page.waitForSelector(`${selectors.termin_btn}, ${selectors.keine_termine_verfuegbar}`);
    const foundElementInnerText = await (await foundElement.getProperty('innerText')).jsonValue();
    console.log(foundElementInnerText)
    
    if (foundElementInnerText === "No appointments available") {
        await page.waitForTimeout(300)
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        await waitForAppointment(page)
    }
    else {
        const wunschLocations = locations.filter(l=>l.wunschLocation).map(l=>l.name)
        const foundElement2 = await page.waitForSelector(`${selectors.location_name}`);
        const locationName = await (await foundElement2.getProperty('innerText')).jsonValue();
        console.log(locationName)
        if (wunschLocations.includes(locationName)) {
            await foundElement.click();
        }
        else {
            await page.waitForTimeout(1*1000)

            await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            await waitForAppointment(page)
        }
    }
}


const waitForReservieren = async (page) => {
    const foundElement = await page.waitForSelector(`${selectors.no_dates}`);
    const foundElementInnerText = await (await foundElement.getProperty('innerText')).jsonValue();
    console.log(foundElementInnerText)
    if (foundElementInnerText.includes("Unfortunately there are no dates available for the requested period.")) {
        await page.waitForTimeout(2*1000)
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        await waitForReservieren(page)
    }    
    else {
        await awaitAndClick(page,selectors.termin_reservieren)  
    }
}


run()


// // firstName
// // lastName
// // birthdate
// // zipCode
// // phoneNumber
// // email