import makeMap from './map.js'
import sources from './mapSources.js'
import mapLayers from './mapLayers.js'
import handleModal from './modal.js'
// add additional imports here (popups, forms, etc)


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
// get additional elements here (forms, etc)


// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in mapLayers) map.addLayer(mapLayers[layer])

    // add map events here (click, mousemove, etc)
})

// modal
handleModal(modal, modalToggle, closeModal)
