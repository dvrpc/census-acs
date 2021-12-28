import makeMap from './map.js'
import sources from './mapSources.js'
import mapLayers from './mapLayers.js'
import secondaryLayers from './secondaryMapLayers.js'
import { makePopup, makePopupContent } from './popup.js'
// add additional imports here (popups, forms, etc)



const toggleForm = document.getElementById('toggle-form')
// get additional elements here (forms, etc)



// variables
const urlCodes = {
    municipality: '0600000US',
    county: '0500000US',
    tract: '1400000US',
    block: '1000000US',
    'block groups': '1500000US'
}



// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in mapLayers) map.addLayer(mapLayers[layer])

    const popup = makePopup()

    // default events
    setHoverEvents('municipality', map, popup)

    toggleForm.onchange = e => {
        const options = Array.from(e.target.children)

        options.forEach(option => {
            const val = option.value

            if(option.selected) setHoverEvents(val, map, popup)
            else removeHoverEvents(val, map)
        })
    }
})

const setHoverEvents = (val, map, popup) => {
    const code = urlCodes[val]

    // add secondary layers on first pass
    if(!map.getLayer(`${val}-outline`)) {
        addHoverLayers(val, map)
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