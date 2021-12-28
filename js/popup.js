const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, e, popup) => {
    const features = e.features[0]
    const layer = features.layer.id
    const props = features.properties
    let html;

    // different geographies will have props
    switch(layer) {
        case 'county-fill':
            html = countyHTML(props)
            break
        default:
            html = muniHTML(props)
    }

    popup
    .setLngLat(e.lngLat)
    .setHTML(html)
    .addTo(map)
}

const muniHTML = props => {
    return `
        <span class="popup-span">
            ${props.name}
        </span>
    `
}
const countyHTML = props => {
    return `
    `
}

export { makePopup, makePopupContent }