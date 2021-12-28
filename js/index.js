import makeMap from './map.js'
import sources from './mapSources.js'
import mapLayers from './mapLayers.js'
import handleModal from './modal.js' 
import { makePopup, makePopupContent } from './popup.js'
// add additional imports here (popups, forms, etc)


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
// get additional elements here (forms, etc)


// variables
const hoverLayers = ['municipality-fill', 'county-fill']
const urlPrefix = 'https://data.census.gov/cedsci/profile?g='

// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in mapLayers) map.addLayer(mapLayers[layer])

    const popup = makePopup()

    map.on('mousemove', 'municipality-fill', e => {
        map.getCanvas().style.cursor = 'pointer'
        map.setFilter('municipality-hover', ['==', 'geoid', e.features[0].properties['geoid']])

        makePopupContent(map, e, popup)
    })

    map.on('mouseleave', 'municipality-fill', e =>{
        map.getCanvas().style.cursor = ''
        map.setFilter('municipality-hover', ['==', 'geoid', ''])

        popup.remove()
    })

    map.on('click', 'municipality-fill', e => {
        const code = '0600000US'
        const geoid = e.features[0].properties['geoid']
        window.open(`https://data.census.gov/cedsci/profile?g=${code}${geoid}`)
    })
})

// modal
handleModal(modal, modalToggle, closeModal)
