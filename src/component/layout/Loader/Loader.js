import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <section>
      <div id="preloader">
        <div id="ctn-preloader" class="ctn-preloader">
          <div class="animation-preloader">
            <div class="spinner"></div>
            <div class="txt-loading">
              <span data-text-preloader="D" class="letters-loading">
                D
              </span>
              <span data-text-preloader="I" class="letters-loading">
                I
              </span>
              <span data-text-preloader="G" class="letters-loading">
                G
              </span>
              <span data-text-preloader="I" class="letters-loading">
                I
              </span>
              <span data-text-preloader="T" class="letters-loading">
                T
              </span>
              <span data-text-preloader="A" class="letters-loading">
                A
              </span>
              <span data-text-preloader="N" class="letters-loading">
                N
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
