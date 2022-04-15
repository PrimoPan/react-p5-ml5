import React from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5";

let video, pose,skeleton;
export default function Canvas (props) {
    const modelLoaded=()=>
    {
        console.log("model ready")
    }
    const gotPoses=(poses)=>{
        if (poses.length>0){
            pose=poses[0].pose;
            skeleton=poses[0].skeleton;
        }
    }
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(640, 480).parent(canvasParentRef);
        video=p5.createCapture(p5.VIDEO);
        video.size(640,480);
        video.hide();
        let poseNet=ml5.poseNet(video,modelLoaded);
        poseNet.on('pose',gotPoses);
    };

    const draw = (p5) => {
        p5.image(video,0,0,640,480);
        p5.image(video,0,0,640,480);
        p5.fill(255,0,0);
        if (pose)
        {
            let eyeL=pose.leftEye;
            let eyeR=pose.rightEye;
            //  ellipse(pose.nose.x,pose.nose.y,dis/2);

            for (let i=0;i<pose.keypoints.length;i++)
            {

                let x=pose.keypoints[i].position.x;
                let y=pose.keypoints[i].position.y;
                p5.fill(0,255,0);
                p5.ellipse(x,y,16);
            }

            for (let i=0;i<skeleton.length;i++)
            {
                let a=skeleton[i][0];
                let b=skeleton[i][1];
                p5.strokeWeight(10);
                p5.stroke(255);
                p5.line(a.position.x,a.position.y,b.position.x,b.position.y)
            }
        }
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
    };

    return <Sketch setup={setup} draw={draw} />;
};