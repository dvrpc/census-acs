import makeMap from './map.js'
import sources from './mapSources.js'
import mapLayers from './mapLayers.js'
import { setHoverEvents, removeHoverEvents } from './mapEvents.js'
import { makePopup } from './popup.js'

const toggleForm = document.getElementById('toggle-form')

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