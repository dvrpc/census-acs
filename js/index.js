import makeMap from './map.js'
import sources from './mapSources.js'
import mapLayers from './mapLayers.js'
import { setHoverEvents, removeHoverEvents } from './mapEvents.js'
import { makePopup } from './popup.js'
import handleModal from './modal.js'

const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const toggleForm = document.getElementById('toggle-form')
const yearSelect = document.getElementById('year-select')

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

            if(option.selected) {                
                // conditionally render time selector
                // @TODO: toggling the time select throws a silent error b/c it's not set up to handle it yet
                if(val === 'municipality' || val === 'county') yearSelect.classList.add('hidden')
                else yearSelect.classList.remove('hidden')

                setHoverEvents(val, map, popup)
            }
            else removeHoverEvents(val, map)
        })
    }
})

// modal
handleModal(modal, modalToggle, closeModal)