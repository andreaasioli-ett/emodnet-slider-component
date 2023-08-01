class EmoSliderComponent extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        .slider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
        }

        .slider-horizontal {
          width: 300px;
          height: 10px;
          background-color: #ccc;
          position: relative;
        }

        .slider-vertical {
          width: 10px;
          height: 150px;
          background-color: #ccc;
          position: relative;
          margin-left: 20px;
        }

        .slider-handle {
          width: 20px;
          height: 20px;
          background-color: #ff5722;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: grab;
          border-radius: 50%;
        }
      </style>
      <div class="slider-container">
        <div class="slider-horizontal">
          <div class="slider-handle"></div>
        </div>
        <div class="slider-vertical">
          <div class="slider-handle"></div>
        </div>
      </div>
    `;

        // Select the slider handles
        this.horizontalHandle = this.shadowRoot.querySelector(".slider-horizontal .slider-handle");
        this.verticalHandle = this.shadowRoot.querySelector(".slider-vertical .slider-handle");

        // Add event listeners for handle dragging
        this.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.horizontalHandle.addEventListener("mousedown", this.startHorizontalDrag.bind(this));
        this.verticalHandle.addEventListener("mousedown", this.startVerticalDrag.bind(this));

    }
    handleMouseDown(event) {
        if (event.target.classList.contains("slider-handle")) {
            event.preventDefault();
        }
    }

    handleMouseUp(event) {
        if (event.target.classList.contains("slider-handle")) {
            event.preventDefault();
            this.endDrag();
        }
    }

    startHorizontalDrag(event) {
        event.preventDefault();

        document.addEventListener("mousemove", this.handleHorizontalDrag.bind(this));
        document.addEventListener("mouseup", this.endDrag.bind(this));
    }

    startVerticalDrag(event) {
        event.preventDefault();

        document.addEventListener("mousemove", this.handleVerticalDrag.bind(this));
        document.addEventListener("mouseup", this.endDrag.bind(this));
    }

    handleHorizontalDrag(event) {
        const sliderRect = this.shadowRoot.querySelector(".slider-horizontal").getBoundingClientRect();
        let newPosition = (event.clientX - sliderRect.left) / sliderRect.width;
        newPosition = Math.max(0, Math.min(1, newPosition));
        this.horizontalHandle.style.left = `${newPosition * 100}%`;
    }

    handleVerticalDrag(event) {
        const sliderRect = this.shadowRoot.querySelector(".slider-vertical").getBoundingClientRect();
        let newPosition = 1 - (event.clientY - sliderRect.top) / sliderRect.height;
        newPosition = Math.max(0, Math.min(1, newPosition));
        this.verticalHandle.style.top = `${(1 - newPosition) * 100}%`; // Invertiamo la posizione verticale
    }

    endDrag() {
        document.removeEventListener("mousemove", this.handleHorizontalDrag.bind(this));
        document.removeEventListener("mousemove", this.handleVerticalDrag.bind(this));
    }

}

customElements.define('emo-slider', EmoSliderComponent);
