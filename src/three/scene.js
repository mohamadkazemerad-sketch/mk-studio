import * as THREE from "three";


const container = document.querySelector(".hero-3d");


const scene = new THREE.Scene();

const world = new THREE.Group();

scene.add(world);

world.scale.set(
    0.55,
    0.55,
    0.55,
);

const camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    1000
);


camera.position.z = 6;



const renderer = new THREE.WebGLRenderer({

    antialias:true,
    alpha:true

});


renderer.setClearColor(
    0x000000,
    0
);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

window.addEventListener(
    "resize",
    ()=>{

        camera.aspect =
        container.clientWidth /
        container.clientHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    }
);

container.innerHTML = "";

container.appendChild(
    renderer.domElement
);





const sphere = new THREE.Mesh(

    new THREE.SphereGeometry(
        1.5,
        64,
        64
    ),


new THREE.MeshPhysicalMaterial({

    color:"#0b3b6f",

    metalness:0.45,

    roughness:0.12,

    clearcoat:1,

    clearcoatRoughness:0.08,

    transmission:0.45,

    thickness:2,

    ior:1.45

})

);



world.add(sphere);

sphere.castShadow = true;

const ringGeometry = new THREE.TorusGeometry(
    2.2,
    0.015,
    32,
    200
);


const ringMaterial = new THREE.MeshStandardMaterial({

    color:"#38bdf8",

    metalness:1,

    roughness:0.25,

    emissive:"#38bdf8",

    emissiveIntensity:1

});


const ring = new THREE.Mesh(

    ringGeometry,

    ringMaterial

);


world.add(ring);

const light = new THREE.PointLight(

    "#38bdf8",
    8

);

light.castShadow = true;

const particlesGeometry = new THREE.BufferGeometry();

const particlesCount = 250;

const positions = new Float32Array(
    particlesCount * 3
);


for(let i = 0; i < particlesCount * 3; i++){

    positions[i] =
    (Math.random() - 0.5) * 8;

}


particlesGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
        positions,
        3
    )

);


const particlesMaterial = new THREE.PointsMaterial({

    color:"#60a5fa",

    size:0.035,

    transparent:true,

    opacity:0.65,

    blending:THREE.AdditiveBlending

});


const particles = new THREE.Points(

    particlesGeometry,

    particlesMaterial

);


world.add(particles);

light.position.set(
    3,
    3,
    5
);

const light2 = new THREE.PointLight(

    "#6366f1",
    4

);


light2.position.set(

    -3,
    1,
    3

);


scene.add(light2);

scene.add(light);



scene.add(

    new THREE.AmbientLight(
        "#ffffff",
        1
    )

);

const backLight = new THREE.PointLight(

    "#2563eb",

    6

);


backLight.position.set(

    0,

    0,

    -4

);


scene.add(backLight);



let time = 0;

let floaty = 0;

let targetX = 0;
let targetY = 0;


container.addEventListener(
    "mousemove",
    (event)=>{

        targetX =
        (event.clientX / container.clientWidth - 0.5) * 2;


        targetY =
        (event.clientY / container.clientHeight - 0.5) * 2;


        console.log(targetX,targetY);

    }
);

let cameraX = 0;
let cameraY = 0;

function animate(){

requestAnimationFrame(animate);


time += 0.01;


// چرخش نرم گوی
sphere.rotation.y += 0.005;

sphere.rotation.x += 0.002;


// بالا پایین رفتن نرم کل گوی
sphere.position.y = Math.sin(time) * 0.15;


// حلقه
ring.rotation.x += 0.006;

ring.rotation.y += 0.002;

// ذرات
particles.rotation.y += 0.002;

particles.position.y =
Math.sin(time) * 0.08;



renderer.render(
    scene,
    camera
);


}

const reveals = document.querySelectorAll(".reveal");


window.addEventListener("scroll",()=>{


    reveals.forEach((section)=>{


        const top =
        section.getBoundingClientRect().top;


        if(top < window.innerHeight - 100){

            section.classList.add("active");

        }


    });


});

animate();