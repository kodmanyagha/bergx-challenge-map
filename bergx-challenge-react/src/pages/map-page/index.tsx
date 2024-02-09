import { FormEvent, useMemo, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapLayerMouseEvent,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { useSelector } from "react-redux";
import Pin from "../../components/pin";
import { RootState } from "../../redux/store";
import { formJson, httpApi } from "../../utils/api";
import { CityType, Nullable } from "../../utils/types";

export default function MapPage() {
  const cityState = useSelector((state: RootState) => state.city);

  const [dblClickedPoint, setDblClickedPoint] =
    useState<Nullable<MapLayerMouseEvent>>(null);
  const [popupInfo, setPopupInfo] = useState<Nullable<CityType>>(null);
  const [show, setShow] = useState(false);

  const refAddPinForm = useRef<any>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onMapDblClick(event: MapLayerMouseEvent) {
    const lngLat = event.lngLat;
    console.log(">> 🚀 lngLat:" + lngLat.toString());

    setDblClickedPoint(event);
    handleShow();
  }

  const onAddPinFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = formJson(refAddPinForm?.current);
    formData.latitude = parseFloat(formData.latitude as string);
    formData.longitude = parseFloat(formData.longitude as string);
    console.log(">> 🚀 formData:", formData);

    const api = httpApi();
    await api.post("ws/addPin", formData);

    handleClose();
  };

  const pins = useMemo(
    () =>
      cityState.cities.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    [cityState]
  );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Pin</Modal.Title>
        </Modal.Header>

        <Form onSubmit={onAddPinFormSubmit} ref={refAddPinForm}>
          <input
            type="hidden"
            name="latitude"
            defaultValue={dblClickedPoint?.lngLat.lat}
          />
          <input
            type="hidden"
            name="longitude"
            defaultValue={dblClickedPoint?.lngLat.lng}
          />

          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Name" />
              <Form.Text className="text-muted">
                Write name for this pin.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                name="description"
                placeholder="Description"
              />
              <Form.Text className="text-muted">
                Write a description for this pin.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Container>
        <Row>
          <Col style={{ height: "100vh" }}>
            <Map
              initialViewState={{
                latitude: 54.62162054865083,
                longitude: 15.262645876174744,
                zoom: 4,
                bearing: 0,
                pitch: 0,
              }}
              attributionControl={false}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
              scrollZoom={false}
              doubleClickZoom={false}
              onDblClick={onMapDblClick}
            >
              <GeolocateControl position="top-left" />
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />

              {pins}

              {popupInfo && (
                <Popup
                  anchor="top"
                  longitude={Number(popupInfo.longitude)}
                  latitude={Number(popupInfo.latitude)}
                  onClose={() => setPopupInfo(null)}
                >
                  <div>
                    {popupInfo.name},{" "}
                    <a
                      target="_new"
                      href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.name}`}
                    >
                      Wikipedia
                    </a>
                  </div>
                  {popupInfo.description}
                </Popup>
              )}
            </Map>
          </Col>
        </Row>
      </Container>
    </>
  );
}
