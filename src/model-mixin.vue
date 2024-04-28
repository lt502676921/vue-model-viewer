<template>
  <div style="position: relative; width: 100%; height: 100%; margin: 0; border: 0; padding: 0" ref="container">
    <slot name="progress-bar" :progress="progress" v-if="progress.isComplete === false">
      <!-- <div style="position: absolute; z-index: 2; height: 3px; width: 100%; background-color: rgba(0, 0, 0, 0.04)">
        <div
          :style="{
            width: `${loadProgressPercentage}%`,
            height: '100%',
            backgroundColor: '#1890ff',
            transition: 'width .2s',
          }"
        />
      </div> -->
      <div
        ref="loadingBarElement"
        style="
          position: absolute;
          top: 50%;
          width: 100%;
          height: 2px;
          background-color: #ffffff;
          transform: scaleX(0);
          transform-origin: top left;
          transition: transform 0.5s;
          will-change: transform;
        "
        :style="{ transform: `scaleX(${loadProgressPercentage}%)` }"
      />
    </slot>
    <div
      ref="interaction-prompt"
      style="
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        opacity: 0;
        will-change: opacity;
        transition: opacity 0.3s;
      "
    >
      <div
        id="prompt"
        ref="animated-container"
        style="will-change: transform, opacity; opacity: 0; transition: opacity 0.3s"
      >
        <slot name="interaction-prompt" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="36">
            <defs>
              <path id="A" d="M.001.232h24.997V36H.001z"></path>
            </defs>
            <g transform="translate(-11 -4)" fill="none" fill-rule="evenodd">
              <path fill-opacity="0" fill="#fff" d="M0 0h44v44H0z"></path>
              <g transform="translate(11 3)">
                <path
                  d="M8.733 11.165c.04-1.108.766-2.027 1.743-2.307a2.54 2.54 0 0 1 .628-.089c.16 0 .314.017.463.044 1.088.2 1.9 1.092 1.9 2.16v8.88h1.26c2.943-1.39 5-4.45 5-8.025a9.01 9.01 0 0 0-1.9-5.56l-.43-.5c-.765-.838-1.683-1.522-2.712-2-1.057-.49-2.226-.77-3.46-.77s-2.4.278-3.46.77c-1.03.478-1.947 1.162-2.71 2l-.43.5a9.01 9.01 0 0 0-1.9 5.56 9.04 9.04 0 0 0 .094 1.305c.03.21.088.41.13.617l.136.624c.083.286.196.56.305.832l.124.333a8.78 8.78 0 0 0 .509.953l.065.122a8.69 8.69 0 0 0 3.521 3.191l1.11.537v-9.178z"
                  fill-opacity=".5"
                  fill="#e4e4e4"
                ></path>
                <path
                  d="M22.94 26.218l-2.76 7.74c-.172.485-.676.8-1.253.8H12.24c-1.606 0-3.092-.68-3.98-1.82-1.592-2.048-3.647-3.822-6.11-5.27-.095-.055-.15-.137-.152-.23-.004-.1.046-.196.193-.297.56-.393 1.234-.6 1.926-.6a3.43 3.43 0 0 1 .691.069l4.922.994V10.972c0-.663.615-1.203 1.37-1.203s1.373.54 1.373 1.203v9.882h2.953c.273 0 .533.073.757.21l6.257 3.874c.027.017.045.042.07.06.41.296.586.77.426 1.22M4.1 16.614c-.024-.04-.042-.083-.065-.122a8.69 8.69 0 0 1-.509-.953c-.048-.107-.08-.223-.124-.333l-.305-.832c-.058-.202-.09-.416-.136-.624l-.13-.617a9.03 9.03 0 0 1-.094-1.305c0-2.107.714-4.04 1.9-5.56l.43-.5c.764-.84 1.682-1.523 2.71-2 1.058-.49 2.226-.77 3.46-.77s2.402.28 3.46.77c1.03.477 1.947 1.16 2.712 2l.428.5a9 9 0 0 1 1.901 5.559c0 3.577-2.056 6.636-5 8.026h-1.26v-8.882c0-1.067-.822-1.96-1.9-2.16-.15-.028-.304-.044-.463-.044-.22 0-.427.037-.628.09-.977.28-1.703 1.198-1.743 2.306v9.178l-1.11-.537C6.18 19.098 4.96 18 4.1 16.614M22.97 24.09l-6.256-3.874c-.102-.063-.218-.098-.33-.144 2.683-1.8 4.354-4.855 4.354-8.243 0-.486-.037-.964-.104-1.43a9.97 9.97 0 0 0-1.57-4.128l-.295-.408-.066-.092a10.05 10.05 0 0 0-.949-1.078c-.342-.334-.708-.643-1.094-.922-1.155-.834-2.492-1.412-3.94-1.65l-.732-.088-.748-.03a9.29 9.29 0 0 0-1.482.119c-1.447.238-2.786.816-3.94 1.65a9.33 9.33 0 0 0-.813.686 9.59 9.59 0 0 0-.845.877l-.385.437-.36.5-.288.468-.418.778-.04.09c-.593 1.28-.93 2.71-.93 4.222 0 3.832 2.182 7.342 5.56 8.938l1.437.68v4.946L5 25.64a4.44 4.44 0 0 0-.888-.086c-.017 0-.034.003-.05.003-.252.004-.503.033-.75.08a5.08 5.08 0 0 0-.237.056c-.193.046-.382.107-.568.18-.075.03-.15.057-.225.1-.25.114-.494.244-.723.405a1.31 1.31 0 0 0-.566 1.122 1.28 1.28 0 0 0 .645 1.051C4 29.925 5.96 31.614 7.473 33.563a5.06 5.06 0 0 0 .434.491c1.086 1.082 2.656 1.713 4.326 1.715h6.697c.748-.001 1.43-.333 1.858-.872.142-.18.256-.38.336-.602l2.757-7.74c.094-.26.13-.53.112-.794s-.088-.52-.203-.76a2.19 2.19 0 0 0-.821-.91"
                  fill-opacity=".6"
                  fill="#000"
                ></path>
                <path
                  d="M22.444 24.94l-6.257-3.874a1.45 1.45 0 0 0-.757-.211h-2.953v-9.88c0-.663-.616-1.203-1.373-1.203s-1.37.54-1.37 1.203v16.643l-4.922-.994a3.44 3.44 0 0 0-.692-.069 3.35 3.35 0 0 0-1.925.598c-.147.102-.198.198-.194.298.004.094.058.176.153.23 2.462 1.448 4.517 3.22 6.11 5.27.887 1.14 2.373 1.82 3.98 1.82h6.686c.577 0 1.08-.326 1.253-.8l2.76-7.74c.16-.448-.017-.923-.426-1.22-.025-.02-.043-.043-.07-.06z"
                  fill="#fff"
                ></path>
                <g transform="translate(0 .769)">
                  <mask id="B" fill="#fff">
                    <use xlink:href="#A"></use>
                  </mask>
                  <path
                    d="M23.993 24.992a1.96 1.96 0 0 1-.111.794l-2.758 7.74c-.08.22-.194.423-.336.602-.427.54-1.11.87-1.857.872h-6.698c-1.67-.002-3.24-.633-4.326-1.715-.154-.154-.3-.318-.434-.49C5.96 30.846 4 29.157 1.646 27.773c-.385-.225-.626-.618-.645-1.05a1.31 1.31 0 0 1 .566-1.122 4.56 4.56 0 0 1 .723-.405l.225-.1a4.3 4.3 0 0 1 .568-.18l.237-.056c.248-.046.5-.075.75-.08.018 0 .034-.003.05-.003.303-.001.597.027.89.086l3.722.752V20.68l-1.436-.68c-3.377-1.596-5.56-5.106-5.56-8.938 0-1.51.336-2.94.93-4.222.015-.03.025-.06.04-.09.127-.267.268-.525.418-.778.093-.16.186-.316.288-.468.063-.095.133-.186.2-.277L3.773 5c.118-.155.26-.29.385-.437.266-.3.544-.604.845-.877a9.33 9.33 0 0 1 .813-.686C6.97 2.167 8.31 1.59 9.757 1.35a9.27 9.27 0 0 1 1.481-.119 8.82 8.82 0 0 1 .748.031c.247.02.49.05.733.088 1.448.238 2.786.816 3.94 1.65.387.28.752.588 1.094.922a9.94 9.94 0 0 1 .949 1.078l.066.092c.102.133.203.268.295.408a9.97 9.97 0 0 1 1.571 4.128c.066.467.103.945.103 1.43 0 3.388-1.67 6.453-4.353 8.243.11.046.227.08.33.144l6.256 3.874c.37.23.645.55.82.9.115.24.185.498.203.76m.697-1.195c-.265-.55-.677-1.007-1.194-1.326l-5.323-3.297c2.255-2.037 3.564-4.97 3.564-8.114 0-2.19-.637-4.304-1.84-6.114-.126-.188-.26-.37-.4-.552-.645-.848-1.402-1.6-2.252-2.204C15.472.91 13.393.232 11.238.232A10.21 10.21 0 0 0 5.23 2.19c-.848.614-1.606 1.356-2.253 2.205-.136.18-.272.363-.398.55C1.374 6.756.737 8.87.737 11.06c0 4.218 2.407 8.08 6.133 9.842l.863.41v3.092l-2.525-.51c-.356-.07-.717-.106-1.076-.106a5.45 5.45 0 0 0-3.14.996c-.653.46-1.022 1.202-.99 1.983a2.28 2.28 0 0 0 1.138 1.872c2.24 1.318 4.106 2.923 5.543 4.772 1.26 1.62 3.333 2.59 5.55 2.592h6.698c1.42-.001 2.68-.86 3.134-2.138l2.76-7.74c.272-.757.224-1.584-.134-2.325"
                    fill-opacity=".05"
                    fill="#000"
                    mask="url(#B)"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </slot>
      </div>
    </div>
    <div v-if="progress.isComplete === false" style="position: absolute; z-index: 1; width: 100%; height: 100%">
      <slot name="poster" />
    </div>
    <canvas
      ref="canvas"
      style="width: 100%; height: 100%"
      @mousedown="play"
      @mousewheel="play"
      @pointerdown="play"
      @touchstart="play"
    />
    <div
      class="error-container"
      v-if="isError"
      style="
        width: 100%;
        height: 100%;
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: black;
        color: #ffffff;
      "
    >
      <div>Error loading the model,</div>
      <div>please refresh the page.</div>
    </div>
    <div
      class="object-info"
      style="position: absolute; top: 0; right: 0; transition: all 0.6s ease-in-out"
      :style="{ opacity: progress.isComplete === true ? 1 : 0 }"
    >
      <div
        class="info-icon"
        style="
          position: absolute;
          top: 20px;
          right: 20px;
          color: #565266;
          cursor: pointer;
          transition: ease all 0.3s;
          transform: scale(1.2);
        "
        onmouseover="this.style.color = '#f8f4ff'"
        @mouseover="showInfo"
        onmouseout="this.style.color = '#565266'"
        @mouseout="hideInfo"
        v-on:touchstart="isShowInfo ? hideInfo() : showInfo()"
      >
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="info-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          ></path>
          <path
            d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
          ></path>
        </svg>
      </div>
      <div
        ref="info-window"
        style="
          opacity: 0;
          transition: ease all 0.3s;
          position: absolute;
          top: 46px;
          right: 20px;
          border-radius: 6px;
          padding: 6px 8px;
          color: #fff;
          font-size: 14px;
          background-color: rgba(0, 0, 0, 0.85);
        "
      >
        <div style="display: flex; justify-content: space-between; gap: 8px">
          <div style="color: #696969">File size</div>
          <div>{{ fileSizeText }}</div>
        </div>
        <div style="display: flex; justify-content: space-between; gap: 8px">
          <div style="color: #696969">Vertices</div>
          <div>{{ verticesText }}</div>
        </div>
        <div style="display: flex; justify-content: space-between; gap: 8px">
          <div style="color: #696969">Triangles</div>
          <div>{{ trianglesText }}</div>
        </div>
      </div>
    </div>
    <div
      style="position: absolute; top: 20px; left: 20px; cursor: pointer; transition: all 0.6s ease-in-out"
      :style="{ opacity: progress.isComplete === true ? 1 : 0 }"
      @click="toggleWireframeMode"
      v-on:touchstart="toggleWireframeMode"
      onmouseover="this.style.transform = 'scale(1.2)'"
      onmouseout="this.style.transform = 'scale(1)'"
    >
      <svg
        v-if="isWireframeMode"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.15397 4.85838L2.76481 7.96364M4.15397 4.85838L5.24289 6.56518M4.15397 4.85838L3.87478 3.99065M4.15397 4.85838L2.25 6.49424M4.15397 4.85838L6.87522 3.80374M4.15397 4.85838L6.04453 2.6952M2.76481 7.96364L5.24289 6.56518M2.76481 7.96364L2.25 6.49424M2.76481 7.96364L1.41683 9.46101M2.76481 7.96364L2.30066 11.116M2.76481 7.96364L4.2068 9.86009M5.24289 6.56518L4.2068 9.86009M5.24289 6.56518L6.88333 8.66287M5.24289 6.56518L8.16907 5.70086M5.24289 6.56518L6.87522 3.80374M1.31434 8.49028L2.63063 5.57057L3.87478 3.99065M1.31434 8.49028L1 11.4195M1.31434 8.49028L1.41683 9.46101M3.87478 3.99065L5.73688 2.40596M3.87478 3.99065L2.25 6.49424M3.87478 3.99065L6.04453 2.6952M5.73688 2.40596L8.0193 1.39157M5.73688 2.40596L6.04453 2.6952M1.57887 14.2471L1 11.4195M1.57887 14.2471L2.55316 16.3742M1.57887 14.2471L1.40537 12.1201M1.57887 14.2471L2.39511 14.1653M1.57887 14.2471L3.01734 16.658M1 11.4195L1.40537 12.1201M1 11.4195L1.41683 9.46101M15.0245 20.2544L17.5141 18.656L18.7499 17.2126M15.0245 20.2544L13.3777 20.6603M15.0245 20.2544L12.2098 21M15.7465 2.11809L18.0464 3.82625M15.7465 2.11809L12.9964 1.14189M15.7465 2.11809L14.0083 1.53142M15.7465 2.11809L16.3635 2.6761M18.0464 3.82625L19.6359 6.10608M18.0464 3.82625L16.3635 2.6761M18.0464 3.82625L17.8386 4.38836M19.364 5.71576L19.362 5.70769L19.3483 5.69404M19.366 5.71656L19.37 5.7253M8.0193 1.39157L9.80246 1.06958L10.9973 1M8.0193 1.39157L6.04453 2.6952M8.0193 1.39157L10.9973 1M8.0193 1.39157L8.87832 1.89296M10.9973 1L12.9964 1.14189M10.9973 1L14.0083 1.53142M10.9973 1L12.2813 1.97551M10.9973 1L8.87832 1.89296M12.9964 1.14189L14.0083 1.53142M2.55316 16.3742L4.48543 18.6943M2.55316 16.3742L3.01734 16.658M4.48543 18.6943L7.11597 20.2933M4.48543 18.6943L3.01734 16.658M4.48543 18.6943L5.49191 18.7829M7.11597 20.2933L9.02462 20.8104L10.1871 20.9795M7.11597 20.2933L8.31611 19.9924M7.11597 20.2933L10.1871 20.9795M7.11597 20.2933L5.49191 18.7829M10.1871 20.9795L12.2098 21M10.1871 20.9795L8.31611 19.9924M10.1871 20.9795L13.3777 20.6603M10.1871 20.9795L11.4016 20.1712M12.2098 21L13.3777 20.6603M14.0083 1.53142L16.3635 2.6761M14.0083 1.53142L15.2652 2.93464M14.0083 1.53142L12.2813 1.97551M13.3777 20.6603L11.4016 20.1712M13.3777 20.6603L14.3802 19.2802M13.3777 20.6603L16.3394 19.3573M18.7499 17.2126L19.3361 16.4281L20.3542 14.4661M18.7499 17.2126L19.3228 15.0965M18.7499 17.2126L20.3542 14.4661M18.7499 17.2126L17.3047 17.4049M18.7499 17.2126L16.3394 19.3573M19.6359 6.10608L20.6464 8.40296M19.6359 6.10608L19.0244 7.05225M19.6359 6.10608L20.5251 9.20247M19.6359 6.10608L17.8386 4.38836M20.3542 14.4661L20.9999 11.4223M20.3542 14.4661L19.3228 15.0965M20.3542 14.4661L20.4319 12.2477M20.9999 11.4223L20.6464 8.40296M20.9999 11.4223L20.4319 12.2477M20.9999 11.4223L20.5251 9.20247M20.6464 8.40296L20.5251 9.20247M1.40537 12.1201L1.41683 9.46101M1.40537 12.1201L2.30066 11.116M1.40537 12.1201L2.39511 14.1653M1.41683 9.46101L2.25 6.49424M1.41683 9.46101L2.30066 11.116M2.30066 11.116L4.2068 9.86009M2.30066 11.116L2.39511 14.1653M2.30066 11.116L3.9059 13.271M2.39511 14.1653L4.36456 16.3653M2.39511 14.1653L3.01734 16.658M2.39511 14.1653L3.9059 13.271M9.54289 7.80606L6.88333 8.66287M9.54289 7.80606L8.16907 5.70086M9.54289 7.80606L9.35569 10.6528M9.54289 7.80606L12.1866 8.85865M9.54289 7.80606L11.4134 5.80251M6.88333 8.66287L4.2068 9.86009M6.88333 8.66287L8.16907 5.70086M6.88333 8.66287L9.35569 10.6528M6.88333 8.66287L6.46899 11.9741M8.16907 5.70086L6.87522 3.80374M8.16907 5.70086L11.4134 5.80251M8.16907 5.70086L10.125 3.49267M9.35569 10.6528L9.29046 14.0336M9.35569 10.6528L12.1866 8.85865M9.35569 10.6528L12.3103 12.2266M9.35569 10.6528L6.46899 11.9741M12.1866 8.85865L15.1742 10.2926M12.1866 8.85865L11.4134 5.80251M12.1866 8.85865L14.523 6.87353M12.1866 8.85865L12.3103 12.2266M11.4134 5.80251L13.5097 3.98929M11.4134 5.80251L14.523 6.87353M11.4134 5.80251L10.125 3.49267M6.04453 2.6952L6.87522 3.80374M6.04453 2.6952L8.87832 1.89296M9.60605 19.034L9.39623 17.0379M9.60605 19.034L7.02336 18.0939M9.60605 19.034L8.31611 19.9924M9.60605 19.034L12.1538 18.3736M9.60605 19.034L11.4016 20.1712M9.39623 17.0379L9.29046 14.0336M9.39623 17.0379L7.02336 18.0939M9.39623 17.0379L12.1538 18.3736M9.39623 17.0379L12.296 15.7554M9.39623 17.0379L6.52624 15.4689M7.02336 18.0939L4.36456 16.3653M7.02336 18.0939L8.31611 19.9924M7.02336 18.0939L5.49191 18.7829M7.02336 18.0939L6.52624 15.4689M8.31611 19.9924L11.4016 20.1712M8.31611 19.9924L5.49191 18.7829M12.1538 18.3736L15.0819 16.9179M12.1538 18.3736L11.4016 20.1712M12.1538 18.3736L14.3802 19.2802M12.1538 18.3736L12.296 15.7554M11.4016 20.1712L14.3802 19.2802M16.3635 2.6761L15.2652 2.93464M16.3635 2.6761L17.8386 4.38836M15.2652 2.93464L13.5097 3.98929M15.2652 2.93464L17.8386 4.38836M15.2652 2.93464L16.602 5.23289M15.2652 2.93464L12.2813 1.97551M17.8386 4.38836L19.0244 7.05225M17.8386 4.38836L16.602 5.23289M19.2014 12.9012L17.6712 11.7606M19.2014 12.9012L17.5997 14.8891M19.2014 12.9012L19.4651 10.1623M19.2014 12.9012L19.3228 15.0965M19.2014 12.9012L20.4319 12.2477M17.6712 11.7606L15.1742 10.2926M17.6712 11.7606L17.5997 14.8891M17.6712 11.7606L19.4651 10.1623M17.6712 11.7606L17.5005 8.49369M17.6712 11.7606L15.3658 13.7962M17.5997 14.8891L15.0819 16.9179M17.5997 14.8891L19.3228 15.0965M17.5997 14.8891L17.3047 17.4049M17.5997 14.8891L15.3658 13.7962M19.4651 10.1623L19.0244 7.05225M19.4651 10.1623L20.4319 12.2477M19.4651 10.1623L20.5251 9.20247M19.4651 10.1623L17.5005 8.49369M19.3228 15.0965L20.4319 12.2477M19.3228 15.0965L17.3047 17.4049M20.4319 12.2477L20.5251 9.20247M4.2068 9.86009L6.46899 11.9741M4.2068 9.86009L3.9059 13.271M3.9059 13.271L4.36456 16.3653M3.9059 13.271L6.46899 11.9741M3.9059 13.271L6.52624 15.4689M6.46899 11.9741L9.29046 14.0336M6.46899 11.9741L6.52624 15.4689M6.87522 3.80374L8.87832 1.89296M6.87522 3.80374L10.125 3.49267M10.125 3.49267L13.5097 3.98929M10.125 3.49267L8.87832 1.89296M10.125 3.49267L12.2813 1.97551M8.87832 1.89296L12.2813 1.97551M9.29046 14.0336L12.3103 12.2266M9.29046 14.0336L12.296 15.7554M9.29046 14.0336L6.52624 15.4689M12.296 15.7554L15.0819 16.9179M12.296 15.7554L12.3103 12.2266M12.296 15.7554L15.3658 13.7962M6.52624 15.4689L4.36456 16.3653M12.3103 12.2266L15.1742 10.2926M12.3103 12.2266L15.3658 13.7962M4.36456 16.3653L5.49191 18.7829M4.36456 16.3653L3.01734 16.658M3.01734 16.658L5.49191 18.7829M15.1742 10.2926L14.523 6.87353M15.1742 10.2926L17.5005 8.49369M15.1742 10.2926L15.3658 13.7962M17.5005 8.49369L19.0244 7.05225M17.5005 8.49369L14.523 6.87353M17.5005 8.49369L16.602 5.23289M15.3658 13.7962L15.0819 16.9179M14.523 6.87353L13.5097 3.98929M14.523 6.87353L16.602 5.23289M15.0819 16.9179L17.3047 17.4049M15.0819 16.9179L14.3802 19.2802M14.3802 19.2802L17.3047 17.4049M14.3802 19.2802L16.3394 19.3573M17.3047 17.4049L16.3394 19.3573M12.2813 1.97551L13.5097 3.98929M13.5097 3.98929L16.602 5.23289M16.602 5.23289L19.0244 7.05225M19.0244 7.05225L20.5251 9.20247"
          stroke="#5C5C5C"
          stroke-width="0.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="11" cy="11" r="10" stroke="#808080" />
      </svg>
      <svg v-else width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="10" fill="#5C5C5C" stroke="#808080" />
        <ellipse cx="7.49994" cy="6.5" rx="2.5" ry="1.5" transform="rotate(-33.3107 7.49994 6.5)" fill="#BEBEBE" />
      </svg>
    </div>
  </div>
</template>

<script>
import {
  Object3D,
  Vector2,
  Vector3,
  Color,
  Scene,
  // Light,
  Raycaster,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  HemisphereLight,
  DirectionalLight,
  LinearSRGBColorSpace,
  // Loader,
  LoadingManager,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  PMREMGenerator,
} from 'three';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OrbitControls } from './custom-orbitcontrols';
import { gsap } from 'gsap';
import { getSize, getCenter } from './utils';
import { defineComponent } from 'vue';
import { timeline } from './animation.js';
import { SmoothControls, ChangeSource } from './three-components/SmoothControls.js';
import { ModelScene } from './three-components/ModelScene.js';

const DEFAULT_GL_OPTIONS = {
  antialias: true,
  alpha: true,
};

const wiggle = timeline({
  initialValue: 0,
  keyframes: [
    { frames: 5, value: -1 },
    { frames: 1, value: -1 },
    { frames: 8, value: 1 },
    { frames: 1, value: 1 },
    { frames: 5, value: 0 },
    { frames: 18, value: 0 },
  ],
});

const fade = timeline({
  initialValue: 0,
  keyframes: [
    { frames: 1, value: 1 },
    { frames: 5, value: 1 },
    { frames: 1, value: 0 },
    { frames: 6, value: 0 },
  ],
});

export default defineComponent({
  props: {
    src: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    position: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    rotation: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    scale: {
      type: Object,
      default: () => {
        return { x: 1, y: 1, z: 1 };
      },
    },
    lights: {
      type: Array,
      default: () => {
        return [];
      },
    },
    cameraPosition: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    cameraRotation: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    cameraUp: {
      type: Object,
    },
    cameraLookAt: {
      type: Object,
    },
    backgroundColor: {
      default: 0xffffff,
    },
    backgroundAlpha: {
      type: Number,
      default: 1,
    },
    controlsOptions: {
      type: Object,
    },
    crossOrigin: {
      type: String,
      default: 'anonymous',
    },
    requestHeader: {
      type: Object,
      default: () => {},
    },
    outputColorSpace: {
      type: String,
      default: LinearSRGBColorSpace,
    },
    glOptions: {
      type: Object,
    },
    wireframeMode: {
      type: String,
      default: 'triangle',
    },
    deliverVolumeAndSize: {
      type: Function,
    },
  },
  data() {
    const result = {
      object: null,
      raycaster: new Raycaster(),
      mouse: new Vector2(),
      camera: new PerspectiveCamera(45, 1, 0.1, 100),
      scene: new Scene(),
      wrapper: new Object3D(),
      renderer: null,
      composer: null,
      controls: null,
      allLights: [],
      clock: typeof performance === 'undefined' ? Date : performance,
      reqId: null, // requestAnimationFrame id,
      loader: null, // 会被具体实现的组件覆盖
      isPlayed: false, // 是否把玩过场景
      lastPromptOffset: 0,
      lastTick: performance.now(),
      promptElementVisibleTime: Infinity,
      smoothControls: null,
      loadingBarElement: null,
      isError: false, // 加载中是否出现错误
      isShowInfo: false, // 是否展示模型信息（顶点数、面数）
      fileSizeNumber: 0,
      fileSizeText: 0,
      verticesText: 0,
      trianglesText: 0,
      loadingManager: new LoadingManager(
        // Loaded
        () => {
          this.progress.endedAt = Date.now();
          this.promptElementVisibleTime = performance.now();
          if (this.$refs['interaction-prompt']) {
            this.$refs['interaction-prompt'].style.opacity = 1;
          }

          gsap.delayedCall(0.5, () => {
            gsap.to(this.overlayMaterial.uniforms.uAlpha, {
              duration: 3,
              value: 0,
              onComplete: () => (this.overlayMaterial.visible = false),
            });

            if (this.loadingBarElement) {
              this.loadingBarElement.style.transformOrigin = 'top right';
              this.loadingBarElement.style.transition = 'transform 1.5s ease-in-out';
              this.loadingBarElement.style.transform = 'scaleX(0)';
              const that = this;
              // 添加transform结束事件的监听器
              this.loadingBarElement.addEventListener('transitionend', function (event) {
                // 检查是否是对transform属性的过渡效果结束
                if (event.propertyName === 'transform') {
                  // 执行相应的回调操作
                  that.progress.isComplete = true;
                  window.setTimeout(
                    () => that.renderer.setAnimationLoop((time, frame) => that.startFingerGuideAnimation(time, frame)),
                    2000
                  );
                }
              });
            } else {
              this.progress.isComplete = true;
              window.setTimeout(
                () => this.renderer.setAnimationLoop((time, frame) => this.startFingerGuideAnimation(time, frame)),
                2000
              );
            }
          });
        },

        // Progress, 下载完以后的加载进度
        (itemUrl, itemsLoaded, itemsTotal) => {
          let that = this;
          this.fetchFileSize(itemUrl, function (size) {
            that.fileSizeNumber = Number(that.fileSizeNumber) + Number(size);
            that.fileSizeText = that.computeFileSize(that.fileSizeNumber);
          });
          const progressRatio = (itemsLoaded / itemsTotal) * 100;
          if (this.loadingBarElement) {
            if (progressRatio == 100) {
              this.progress.isProgressComplete = true;
            }
          }
        },

        // Error
        error => {
          console.log(error);
          this.isError = true;
        }
      ),
      overlayMaterial: new ShaderMaterial({
        transparent: true,
        uniforms: {
          uAlpha: { value: 1 },
        },
        vertexShader: `
          void main()
          {
              gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uAlpha;

          void main()
          {
              gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
          }
        `,
      }),
    };

    // 确保这些对象不被转为 vue reactive 对象，避免 three 渲染出错
    Object.assign(this, result);

    const reactiveState = {
      size: {
        width: this.width,
        height: this.height,
      },
      progress: {
        isComplete: false,
        lengthComputable: false,
        loaded: 0,
        isProgressComplete: false, // 只用来控制进度条
      },
      isWireframeMode: false,
    };

    // 为了保留类型信息，仍然返回 result 的 type
    return reactiveState;
  },
  computed: {
    loadProgressPercentage() {
      if (this.progress.isProgressComplete) return 100;
      if (this.progress.lengthComputable) {
        // lengthComputable 为 false 时，total 无直接参考意义，但是这里仍然使用它 * 3来作为估计值
        // 因为 gzip 压缩后的长度大约为三分之一
        return Math.min(0.92, this.progress.loaded / (this.progress.total * 3)) * 100;
      }
      return (
        Math.min(
          1,
          isNaN(this.progress.loaded / this.progress.total) ? 0 : this.progress.loaded / this.progress.total
        ) * 100
      );
    },
  },
  mounted() {
    this.lastTick = performance.now();

    // this.scene = new ModelScene({
    //   canvas: this.$refs.canvas,
    //   element: this.$refs.container,
    //   width: this.$refs.container.offsetWidth,
    //   height: this.$refs.container.offsetHeight,
    // });

    // this.camera = this.scene.camera;

    this.smoothControls = new SmoothControls(this.camera);

    if (this.width === undefined || this.height === undefined) {
      this.size = {
        width: this.$refs.container.offsetWidth,
        height: this.$refs.container.offsetHeight,
      };
    }

    const options = Object.assign({}, DEFAULT_GL_OPTIONS, this.glOptions, {
      canvas: this.$refs.canvas,
    });

    this.renderer = new WebGLRenderer(options);
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputColorSpace = this.outputColorSpace;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 2.3;

    // this.composer = new EffectComposer(this.renderer);
    // this.composer.addPass(new RenderPass(this.scene, this.camera));
    // const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.size.width, this.size.height), 1.5, 0.4, 0.85);
    // bloomPass.threshold = 0;
    // bloomPass.strength = 0.19;
    // bloomPass.radius = 0;
    // this.composer.addPass(bloomPass);

    this.controls = new OrbitControls(this.camera, this.$refs.container);
    this.controls.enableDamping = true;
    this.controls.addEventListener('change', this.play);
    // this.controls.type = 'orbit';
    this.controls.model = this.wrapper;

    /**
     * loadingBarElement
     */
    this.loadingBarElement = this.$refs.loadingBarElement;

    /**
     * Overlay
     */
    if (this.loadingBarElement) {
      const overlayGeometry = new PlaneGeometry(2, 2, 1, 1);
      const overlay = new Mesh(overlayGeometry, this.overlayMaterial);
      this.scene.add(overlay);
    }

    this.scene.add(this.wrapper);

    this.load();
    this.update();

    const element = this.$refs.container;

    element.addEventListener('mousedown', this.onMouseDown, false);
    element.addEventListener('mousemove', this.onMouseMove, false);
    element.addEventListener('mouseup', this.onMouseUp, false);
    element.addEventListener('click', this.onClick, false);
    element.addEventListener('dblclick', this.onDblclick, false);

    window.addEventListener('resize', this.onResize, false);

    this.animate();
  },
  beforeUnmount() {
    cancelAnimationFrame(this.reqId);

    this.renderer.dispose();

    if (this.controls) {
      this.controls.dispose();
    }

    const element = this.$refs.container;

    element.removeEventListener('mousedown', this.onMouseDown, false);
    element.removeEventListener('mousemove', this.onMouseMove, false);
    element.removeEventListener('mouseup', this.onMouseUp, false);
    element.removeEventListener('click', this.onClick, false);
    element.removeEventListener('dblclick', this.onDblclick, false);

    window.removeEventListener('resize', this.onResize, false);
  },
  watch: {
    src() {
      this.load();
    },
    rotation: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.rotation.set(val.x, val.y, val.z);
      },
    },
    position: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.position.set(val.x, val.y, val.z);
      },
    },
    scale: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.scale.set(val.x, val.y, val.z);
      },
    },
    lights: {
      deep: true,
      handler() {
        this.updateLights();
      },
    },
    size: {
      deep: true,
      handler() {
        this.updateCamera();
        this.updateRenderer();
      },
    },
    controlsOptions: {
      deep: true,
      handler() {
        this.updateControls();
      },
    },
    backgroundAlpha() {
      this.updateRenderer();
    },
    backgroundColor() {
      this.updateRenderer();
    },
  },
  methods: {
    onResize() {
      if (!this.$refs.container) return;
      if (this.width === undefined || this.height === undefined) {
        this.$nextTick(() => {
          this.size = {
            width: this.$refs.container.offsetWidth,
            height: this.$refs.container.offsetHeight,
          };
        });
      }
    },
    onMouseDown(event) {
      if (!this.$attrs.onMousedown) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('mousedown', event, intersected);
    },
    onMouseMove(event) {
      // console.log(this.$attrs);
      if (!this.$attrs.onMousemove) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('mousemove', event, intersected);
    },
    onMouseUp(event) {
      if (!this.$attrs.onMouseup) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('mouseup', event, intersected);
    },
    onClick(event) {
      if (!this.$attrs.onClick) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('click', event, intersected);
    },
    onDblclick(event) {
      if (!this.$attrs.onDblclick) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('dblclick', event, intersected);
    },
    pick(x, y) {
      if (!this.object) return null;
      if (!this.$refs.container) return;

      const rect = this.$refs.container.getBoundingClientRect();

      x -= rect.left;
      y -= rect.top;

      this.mouse.x = (x / this.size.width) * 2 - 1;
      this.mouse.y = -(y / this.size.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObject(this.object, true);

      return (intersects && intersects.length) > 0 ? intersects[0] : null;
    },
    update() {
      this.updateRenderer();
      this.updateCamera();
      this.updateLights();
      this.updateControls();
    },
    updateModel() {
      const { object } = this;

      if (!object) return;

      const { position } = this;
      const { rotation } = this;
      const { scale } = this;

      const { x = 0, y = 0, z = 0 } = rotation;

      object.position.set(position.x, position.y, position.z);
      object.rotation.set(x, y, z);
      object.scale.set(scale.x, scale.y, scale.z);
    },
    updateRenderer() {
      const { renderer } = this;

      renderer.setSize(this.size.width, this.size.height);
      // this.composer.setSize(this.size.width, this.size.height);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setClearColor(new Color(this.backgroundColor).getHex());
      renderer.setClearAlpha(this.backgroundAlpha);
    },
    updateCamera() {
      const { camera } = this;
      const { object } = this;

      camera.aspect = this.size.width / this.size.height;
      camera.updateProjectionMatrix();

      if (!this.cameraLookAt || !this.cameraUp) {
        if (!object) return;

        const distance = getSize(object).length();

        camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);

        if (this.cameraPosition.x === 0 && this.cameraPosition.y === 0 && this.cameraPosition.z === 0) {
          camera.position.z = distance * 1.08;
          this.smoothControls.setRadius(distance * 1.08);
        }

        camera.lookAt(new Vector3());
      } else {
        camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);
        camera.up.set(this.cameraUp.x, this.cameraUp.y, this.cameraUp.z);

        camera.lookAt(new Vector3(this.cameraLookAt.x, this.cameraLookAt.y, this.cameraLookAt.z));
      }
    },
    updateLights() {
      this.scene.remove(...this.allLights);

      // this.scene.add(new THREE.HemisphereLight(0xffeeb1, 0x080820, 4));

      // const spotLight = new THREE.SpotLight(0xffa95c, 4);
      // spotLight.castShadow = true;
      // spotLight.shadow.bias = -0.0001;
      // spotLight.shadow.mapSize.width = 1024 * 4;
      // spotLight.shadow.mapSize.height = 1024 * 4;
      // this.scene.add(spotLight);

      // if (this && this.renderer) {
      //   let that = this;
      //   new RGBELoader().load(
      //     'https://assets-1320256551.cos.ap-beijing.myqcloud.com/objectviewhdr/brown_photostudio_06_1k.hdr',
      //     function (texture) {
      //       const gen = new PMREMGenerator(that.renderer);
      //       const envMap = gen.fromEquirectangular(texture).texture;
      //       envMap.colorSpace = THREE.SRGBColorSpace;
      //       envMap.material = THREE.EquirectangularReflectionMapping;
      //       that.scene.environment = envMap;
      //       // scene.background = envMap;
      //     }
      //   );
      // }

      // this.renderer.toneMappingExposure = 10

      this.allLights = [];

      this.lights.forEach(item => {
        if (!item.type) return;

        const type = item.type.toLowerCase();

        let light = null;

        if (type === 'ambient' || type === 'ambientlight') {
          const color = item.color === 0x000000 ? item.color : item.color || 0x404040;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

          light = new AmbientLight(color, intensity);
        } else if (type === 'point' || type === 'pointlight') {
          const color = item.color === 0x000000 ? item.color : item.color || 0xffffff;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;
          const distance = item.distance || 0;
          const decay = item.decay === 0 ? item.decay : item.decay || 1;

          light = new PointLight(color, intensity, distance, decay);

          if (item.position) {
            light.position.copy(item.position);
          }
        } else if (type === 'directional' || type === 'directionallight') {
          const color = item.color === 0x000000 ? item.color : item.color || 0xffffff;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

          light = new DirectionalLight(color, intensity);

          if (item.position) {
            light.position.copy(item.position);
          }

          if (item.target) {
            light.target.copy(item.target);
          }
        } else if (type === 'hemisphere' || type === 'hemispherelight') {
          const skyColor = item.skyColor === 0x000000 ? item.skyColor : item.skyColor || 0xffffff;
          const groundColor = item.groundColor === 0x000000 ? item.groundColor : item.groundColor || 0xffffff;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

          light = new HemisphereLight(skyColor, groundColor, intensity);

          if (item.position) {
            light.position.copy(item.position);
          }
        }

        if (light) {
          this.allLights.push(light);
          this.scene.add(light);
        }
      });
    },
    updateControls() {
      if (this.controlsOptions) {
        Object.assign(this.controls, this.controlsOptions);
      }
    },
    reportProgress(type, data) {
      if (type === 'start') {
        this.progress.isComplete = false;
        this.progress.startedAt = Date.now();
        this.progress.loaded = 0;
        this.progress.total = 0;
      } else if (type === 'end') {
        // 此处表示下载资源完成，等待加载
        // 加载完成后的逻辑交给LoadingManager的loaded事件处理
        // this.progress.isComplete = true;
        // this.progress.endedAt = Date.now();
      } else {
        this.progress.lengthComputable = data?.lengthComputable ?? false;
        this.progress.loaded = data?.loaded ?? 0;
        this.progress.total = data?.total ?? 0;
      }
    },
    load() {
      if (!this.src) return;

      if (this.object) {
        this.wrapper.remove(this.object);
      }

      this.loader.setRequestHeader(this.requestHeader);

      this.reportProgress('start');

      this.loader.load(
        this.src,
        (...args) => {
          this.reportProgress('end');

          const object = this.getObject(...args);

          this.process(object);

          this.addObject(object);

          this.$emit('load');
        },
        event => {
          this.reportProgress('progress', event);
          this.$emit('progress', event);
        },
        event => {
          this.reportProgress('end');
          this.$emit('error', event);
        }
      );
    },
    process(object) {
      return object;
    },
    getObject(object) {
      return object;
    },
    addObject(object) {
      this.object = object;
      this.wrapper.add(object);

      this.updateCamera();
      this.updateModel();

      const center = getCenter(object);

      // correct position
      this.wrapper.position.copy(center.negate());
    },
    animate() {
      this.reqId = requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      // this.composer.render();
    },
    startFingerGuideAnimation(t, frame) {
      const delta = t - this.lastTick;
      this.lastTick = t;

      const animatedContainer = this.$refs['animated-container'];

      if (animatedContainer && !this.isPlayed) {
        const now = performance.now();
        const animationTime = ((now - this.promptElementVisibleTime) / 5000) % 1;
        const offset = wiggle(animationTime);
        const opacity = fade(animationTime);
        animatedContainer.style.opacity = `${opacity}`;
        if (offset !== this.lastPromptOffset) {
          const xOffset = offset * this.size.width * 0.05;
          const deltaTheta = ((offset - this.lastPromptOffset) * Math.PI) / 16;

          animatedContainer.style.transform = `translateX(${xOffset}px)`;

          this.smoothControls.changeSource = ChangeSource.AUTOMATIC;

          this.smoothControls.adjustOrbit(deltaTheta, 0, 0);

          this.lastPromptOffset = offset;
        }

        this.smoothControls.update(t, delta);
        // this.scene.updateTarget(delta);
      }
    },
    play(event) {
      this.isPlayed = true;
      this.$refs['interaction-prompt'].style.opacity = 0;
    },
    showInfo() {
      this.isShowInfo = true;
      this.$refs['info-window'].style.opacity = 1;
    },
    hideInfo() {
      this.isShowInfo = false;
      this.$refs['info-window'].style.opacity = 0;
    },
    updateObjectInfo() {
      Number.prototype.format = function () {
        return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      };
      // const modifier = new SimplifyModifier()

      const object = this.object;

      // const tempMaterial = null;
      // object.traverse(child => {
      //   if(child.isMesh) {
      //     if(child.material) {
      //       tempMaterial = child.material
      //     }
      //   }
      // })

      // if ( object === null ) {
      //   container.setDisplay( 'none' );
      //   return
      // }
      // container.setDisplay( '' );

      let vertices = 0,
        triangles = 0;

      object.traverseVisible(function (object) {
        if (object.isMesh || object.isPoints) {
          // console.log(object.geometry.attributes.position.count);
          // const count = Math.floor( object.geometry.attributes.position.count *  0.1)
          // console.log(count);
          // object.geometry = modifier.modify(object.geometry, count)
          // object.geometry.computeFaceNormals();
          // object.geometry.computeVertexNormals();

          const geometry = object.geometry;

          vertices += geometry.attributes.position.count;

          if (object.isMesh) {
            if (geometry.index !== null) {
              triangles += geometry.index.count / 3;
            } else {
              triangles += geometry.attributes.position.count / 3;
            }
          }
        }
      });

      this.verticesText = vertices.format();
      this.trianglesText = triangles.format();
    },
    fetchFileSize(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var size = xhr.getResponseHeader('Content-Length');
          callback(size);
        }
      };
      xhr.send(null);
    },
    computeFileSize(size) {
      //把字节转换成正常文件大小
      if (!size) return '';
      var num = 1024.0; //byte
      if (size < num) return size + 'B';
      if (size < Math.pow(num, 2)) return (size / num).toFixed(1) + 'KB'; //kb
      if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(1) + 'MB'; //M
      if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(1) + 'G'; //G
      return (size / Math.pow(num, 4)).toFixed(1) + 'T'; //T
    },
    toggleWireframeMode() {
      this.isWireframeMode = !this.isWireframeMode;
      if (this.isWireframeMode) {
        if (this.wireframeMode === 'triangle') {
          this.object.traverse(child => {
            if (child.isMesh && child.geometry) {
              const edges = new THREE.EdgesGeometry(child.geometry, 1);
              // const edgesMtl =  new THREE.LineBasicMaterial({ color: 0xff0000 });
              const edgesMtl = new THREE.LineBasicMaterial({ color: 0x444444 });
              const line = new THREE.LineSegments(edges, edgesMtl);
              line.name = 'wireframeHelper';
              child.add(line);
            }
          });
        }
        if (this.wireframeMode === 'quad') {
          let geo = this.object.children[0].geometry;
          geo = geo.toNonIndexed();
          const pos = geo.attributes.position;
          const count = pos.array.length / 3;

          const quadToTriangle = [1, 0, 3, 1, 3, 2];
          // 3----2
          // 0----1
          // Make sure pixels on 1---3 edge will not have channel 0.
          // And pixels on four edges have at least one channel 0.
          const quadBarycentric = [
            [1, 1, 0, 0],
            [0, 1, 0, 1],
            [1, 0, 0, 1],
            [1, 0, 1, 0],
          ];
          let bary = [];
          for (let i = 0; i < count; i += 6) {
            for (let j = 0; j < 6; j++) {
              bary.push(...quadBarycentric[quadToTriangle[j]]);
            }
          }
          bary = new Float32Array(bary);
          geo.setAttribute('barycentric', new THREE.BufferAttribute(bary, 4));
          const material = new THREE.ShaderMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            fragmentShader: `
              varying vec4 vBarycentric;

              varying vec3 vbc;
              const float lineWidth = 1.0;
              const vec3 color = vec3(0.0, 2.0, 1.0);

              float edgeFactor () {
                vec4 d = fwidth(vBarycentric);
                vec4 a4 = smoothstep(vec4(0.0), d * lineWidth, vBarycentric);
                return min(min(min(a4.x, a4.y), a4.z), a4.w);
              }

              void main() {
                if (vBarycentric.x > lineWidth || vBarycentric.y > lineWidth) {
                  gl_FragColor = vec4(min(vec3(edgeFactor()), color), 1);
                }
              }
            `,
            vertexShader: `
              attribute vec4 barycentric;

              varying vec4 vBarycentric;

              varying vec3 vPosition;
              varying vec2 vUv;

              void main () {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
                vBarycentric = barycentric;
                vPosition = position.xyz;
                vUv = uv;
              }
            `,
          });
          const mesh = new THREE.Mesh(geo, material);
          mesh.name = 'wireframeHelper';
          this.object.children[0].add(mesh);
        }
      } else {
        let toBeDeleted = [];
        this.object.traverse(child => {
          if (child.name === 'wireframeHelper') {
            toBeDeleted.push(child);
          }
        });
        if (toBeDeleted.length > 0) {
          toBeDeleted.forEach(i => i.parent.remove(i));
        }
      }
    },
    computeVolume(geometry) {
      if (!geometry.isBufferGeometry) {
        console.log("'geometry' must be an indexed or non-indexed buffer geometry");
        return 0;
      }
      var isIndexed = geometry.index !== null;
      let position = geometry.attributes.position;
      let sum = 0;
      let p1 = new THREE.Vector3(),
        p2 = new THREE.Vector3(),
        p3 = new THREE.Vector3();
      if (!isIndexed) {
        let faces = position.count / 3;
        for (let i = 0; i < faces; i++) {
          p1.fromBufferAttribute(position, i * 3 + 0);
          p2.fromBufferAttribute(position, i * 3 + 1);
          p3.fromBufferAttribute(position, i * 3 + 2);
          sum += this.signedVolumeOfTriangle(p1, p2, p3);
        }
      } else {
        let index = geometry.index;
        let faces = index.count / 3;
        for (let i = 0; i < faces; i++) {
          p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
          p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
          p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
          sum += this.signedVolumeOfTriangle(p1, p2, p3);
        }
      }
      return sum;
    },
    signedVolumeOfTriangle(p1, p2, p3) {
      return p1.dot(p2.cross(p3)) / 6.0;
    },
  },
});
</script>
