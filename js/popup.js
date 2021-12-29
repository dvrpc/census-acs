const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, e, popup) => {
    const features = e.features[0]
    const props = features.properties
    let html;

    // different geographies will have different props
    switch(features.layer.id) {
        case 'county-fill':
            html = countyHTML(props)
            break
        case 'tract-fill':
            html = tractHTML(props)
            break
        case 'block-fill':
            html = blockHTML(props)
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
        <span class="popup-span">
            ${props.name} County
        </span>
    `
}
const tractHTML = props => {
    return `
        <span class="popup-span">
                geoid: ${props.geoid}
        </span>
    `
}
const blockHTML = props => {
    return `
        <span class="popup-span">
                geoid: ${props.GEOID10}
        </span>
    `
}

export { makePopup, makePopupContent }