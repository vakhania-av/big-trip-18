import InfoView from '../view/trip-info-view';
import { render, RenderPosition, remove } from '../framework/render.js';
import { sortByDate } from '../utils/point.js';

const { AFTERBEGIN } = RenderPosition;

export default class InfoPresenter {
  #container = null;
  #tripInfoComponent = null;
  #pointsModel = null;

  #points = [];
  #offers = [];
  #destinations = [];

  #boardPoints = new Map();

  constructor (container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#points = this.#pointsModel.points;
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#points.sort(sortByDate);
    this.#tripInfoComponent = new InfoView(this.#points, this.#offers, this.#destinations);

    render(this.#tripInfoComponent, this.#container, AFTERBEGIN);

    this.#boardPoints.clear();
  };


  #handleModelEvent = () => {
    remove(this.#tripInfoComponent);

    this.#points = this.#pointsModel.points;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;

    this.init();
  };
}
