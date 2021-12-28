import { makePopupContent } from "./popup.js"
import secondaryLayers from './secondaryMapLayers.js'



// variables
const urlCodes = {
    municipality: '0600000US',
    county: '0500000US',
    tract: '1400000US',
    block: '1000000US',
    'block groups': '1500000US'
}



const setHoverEvents = (val, map, popup) => {
    const code = urlCodes[val]

    // add secondary layers on first pass or toggle visible back on
    if(!map.getLayer(`${val}-outline`)) {
        addHoverLayers(val, map)
    }else {
        map.setLayoutProperty(`${val}-outline`, 'visibility', 'visible')
        map.setLayoutProperty(`${val}-fill`, 'visibility', 'visible')
        map.setLayoutProperty(`${val}-hover`, 'visibility', 'visible')
    }

    map.on('mousemove', `${val}-fill`, e => {
        map.getCanvas().style.cursor = 'pointer'
        map.setFilter(`${val}-hover`, ['==', 'geoid', e.features[0].properties['geoid']])

        makePopupContent(map, e, popup)
    })

    map.on('mouseleave', `${val}-fill`, e =>{
        map.getCanvas().style.cursor = ''
        map.setFilter(`${val}-hover`, ['==', 'geoid', ''])

        popup.remove()
    })

    map.on('click', `${val}-fill`, e => {
        const geoid = e.features[0].properties['geoid']
        window.open(`https://data.census.gov/cedsci/profile?g=${code}${geoid}`)
    })
}

const addHoverLayers = (val, map) => {
    secondaryLayers[`${val}Outline`]

    map.addLayer(secondaryLayers[`${val}Outline`])
    map.addLayer(secondaryLayers[`${val}Hover`])
    map.addLayer(secondaryLayers[`${val}Fill`])
}

const removeHoverEvents = (val, map) => {

    if(!map.getLayer(`${val}-outline`)) return

    map.setLayoutProperty(`${val}-outline`, 'visibility', 'none')
    map.setLayoutProperty(`${val}-fill`, 'visibility', 'none')
    map.setLayoutProperty(`${val}-hover`, 'visibility', 'none')
}

export { setHoverEvents, addHoverLayers, removeHoverEvents, }