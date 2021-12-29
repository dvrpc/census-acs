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
        const geoid = val === 'block' ? e.features[0].properties['GEOID10'] : e.features[0].properties['geoid']

        map.getCanvas().style.cursor = 'pointer'
        map.setFilter(`${val}-hover`, ['==', 'geoid', geoid])

        makePopupContent(map, e, popup)
    })

    map.on('mouseleave', `${val}-fill`, () => {
        const geoid = val === 'block' ? 'GEOID10' : 'geoid'
        
        map.getCanvas().style.cursor = ''
        map.setFilter(`${val}-hover`, ['==', geoid, ''])

        popup.remove()
    })

    map.on('click', `${val}-fill`, e => {
        const geoid = e.features[0].properties['geoid'] || e.features[0].properties['GEOID10']
        window.open(`https://data.census.gov/cedsci/profile?g=${code}${geoid}`)
    })
}

const addHoverLayers = (val, map) => {
    map.addLayer(secondaryLayers[`${val}Outline`], 'road-label')
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