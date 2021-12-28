mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

const initMap = () => {
    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [-75.25, 40.071],
        zoom: 8.425
    })
}

const makeRegionalExtentControl = map => {
    // coordinates and zoom level for regional extent
    const dvrpcExtent = {
        center: [-75.25, 40.071],
        zoom: 8.425
    }

    const navigationControl = new mapboxgl.NavigationControl();

    // create custom button elements
    const button = document.createElement('button')
    const icon = document.createElement('img')

    button.type = 'button'
    icon.id = 'regional-extent-img'
    icon.alt = 'DVRPC Alternative Logo'
    icon.src = 'https://www.dvrpc.org/img/banner/new/bug-favicon.png'

    button.classList.add('mapboxgl-ctrl-icon')
    button.classList.add('mapboxgl-ctrl-dvrpc')

    button.setAttribute('aria-label', 'Default DVRPC Extent')

    button.onclick = () => map.flyTo({center: dvrpcExtent.center, zoom: dvrpcExtent.zoom}) 

    button.appendChild(icon)

    // plug into mapbox fncs
    navigationControl._extent = button
    navigationControl._container.appendChild(button)

    return navigationControl
}

const makeMap = () => {
    const map = initMap()
    const control = makeRegionalExtentControl(map)

    map.addControl(control);

    return map
}

export default makeMap