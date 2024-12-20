<template>
    <div class="about h-full flex flex-row items-center p-7 justify-center">
        <div class="wrapper-circle basis-1/3">
            <div class="circle"><img src="@/assets/code-bloc-white.png" alt="code bloc logo"></div>
        </div>
        <div class="basis-1/2 p-7">
            <h1>Code Bloc</h1>
            <h3 class="text-secondary">/blɑːk/</h3>
            <p class="text-secondary"><em>A combination of countries, parties, or groups sharing a common purpose.</em></p>
            <p>Code bloc is a place to give visibility to open-source projects by making them easily searchable. It's about giving back by helping to increase contributions they received.</p>
        </div>
    </div>
</template>

<style scoped>
.wrapper-circle {
    position: relative;
}
.circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 500px;
    width: 500px;
    border-radius: 50%;
    background-color: black;
    border-width: 0px;
    border-color: #ffffff27;
}
.circle::before, 
.circle::after {
    content: '';
    display: block;
    /*height: 500px;
    width: 500px;*/
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: .8;
}
.circle::after {
    border-width: 0px;
    z-index: -1;
    animation: glitch-reverse .3s cubic-bezier(.25, .46, .45, .94) reverse both 5;
}
.circle::before {
    border-width: 0px;
    z-index: -2;
    animation: glitch .3s cubic-bezier(.25, .46, .45, .94) both 5;
}
.circle:hover::before {
    animation: glitch .3s cubic-bezier(.25, .46, .45, .94) both infinite;
}
.circle:hover::after {
    animation: glitch-reverse .3s cubic-bezier(.25, .46, .45, .94) reverse both infinite;
}
.circle img {
    position: absolute;
    width: 60%;
    top: 100px;
    left: 50px;
    animation: glitch-move .3s cubic-bezier(.25, .46, .45, .94) both 5;
}
.circle:hover img {
    animation: glitch-move .3s cubic-bezier(.25, .46, .45, .94) both infinite;
}

@keyframes glitch {
  0% {
    border-width: 10px;
    border-color: #0ff;
    transform: translate(0)
  }
  20% {
    transform: translate(-5px, 5px)
  }
  40% {
    transform: translate(-5px, -5px)
  }
  60% {
    transform: translate(5px, 5px)
  }
  80% {
    transform: translate(5px, -5px)
  }
  to {
    border-width: 0px;
    border-color: #0ff;
    transform: translate(0)
  }
}

@keyframes glitch-reverse {
  0% {
    border-width: 0px;
    border-color: #f0f;
    transform: translate(0)
  }
  20% {
    transform: translate(-5px, 5px)
  }
  40% {
    transform: translate(-5px, -5px)
  }
  60% {
    transform: translate(5px, 5px)
  }
  80% {
    transform: translate(5px, -5px)
  }
  to {
    border-width: 10px;
    border-color: #f0f;
    transform: translate(0)
  }
}

@keyframes glitch-move {
0% {
    transform: translate(0)
  }
  20% {
    transform: translate(-5px, 5px)
  }
  40% {
    transform: translate(-5px, -5px)
  }
  60% {
    transform: translate(5px, 5px)
  }
  80% {
    transform: translate(5px, -5px)
  }
  to {
    transform: translate(0)
  }
}

</style>
