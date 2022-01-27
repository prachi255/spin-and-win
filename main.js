let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}

let config={
    type : Phaser.CANVAS,
    width : 700,
    height:550,
    scene:{
          preload:preload,
          create:create,
          update:update
    }
};
let game=new Phaser.Game(config);
function preload (){
console.log("1");
this.load.image('background','../Assets/back.jpg');
this.load.image('wheel','../Assets/wheel.png');
this.load.image('pin','../Assets/pin.png');
this.load.image('stand','../Assets/stand.png');
}
function create(){
    console.log("111");
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);

       //lets create the stand
       let stand = this.add.sprite(W/2,H/2 + 250,'stand');
       stand.setScale(0.25);
       
       //creating pin
       let pin = this.add.sprite(W/2,H/2-250,"pin");
       pin.setScale(0.25);
       pin.depth = 1;
       
       //creating wheel
       this.wheel = this.add.sprite(W/2,H/2,"wheel");
       this.wheel.setScale(0.25); 

         //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    
    //creating text object
    font_style = {
        font : "bold 24px Arial",
        align : "center",
        color : "maroon",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
    

}
function update(){
    console.log("1234567");
   // this.wheel.angle += 1;
}
function spinwheel(){
    
    console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse!");
    
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won something " + prizes_config.prize_names[idx]);
        },
    });
    
}
