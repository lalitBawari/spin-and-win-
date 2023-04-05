var config = {
    width: 1500,
    height: 800,
    scene: {
        preload: preload,
        create: create,     
    }
};
var game = new Phaser.Game(config);
function preload ()
{
    this.load.image('background', 'https://th.bing.com/th/id/R.09fce99053b67500e69030b49e9ae399?rik=irHsnM2isJbKBQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fhczZAMb.jpg&ehk=ZWWP9vgBCbaY%2bT4viPt2xnpXv21O9zP9N4gQNYkDqpk%3d&risl=&pid=ImgRaw&r=0');
    this.load.image('mywheel', 'https://kiiirtiiii.github.io/SpinTheWheel/Assets/wheel.png');
    this.load.image('pin', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/pin.png?token=AIEJHUVO2BG5Q3LMEKJAGLK65DQVE');
    this.load.image('stand', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/stand.png?token=AIEJHUXY62RXXLVBGYWWQZC65DQVW');
    this.load.image('startBtn','https://th.bing.com/th/id/R.5d9a943361aa43ab79cd535b42cdb754?rik=F3hHu39B6glSww&riu=http%3a%2f%2fi2.kym-cdn.com%2fphotos%2fimages%2foriginal%2f000%2f913%2f847%2f3ea.gif&ehk=wDNptrb%2fUH6nOtB%2bFK7ntTbI89z4BfFBrCqYyiyE1%2fA%3d&risl=&pid=ImgRaw&r=0');
    this.load.image('yougot','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/back.jpg?token=AIEJHUX5QOTUCFFYWAEQI7265DL4U');
    this.load.image('try','https://th.bing.com/th/id/R.731c738f340e7876a014ca9de6bad082?rik=1EarVonxKhUFmw&riu=http%3a%2f%2fmyspintowin.ca%2fwp-content%2fuploads%2f2017%2f01%2fSpin-to-Win-Landing-06.png&ehk=NEG3njdyuc4M4EySwXqjxT%2bD9YsTEOsQfwmdB4pS6No%3d&risl=&pid=ImgRaw&r=0');
    this.load.image('restart', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/restart.png?token=AIEJHUTPRGASQSETEX4ABQK65CBRS');
    this.load.audio('sound','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/sound.mp3?token=AIEJHUQ3OVWNLZO3BAZOFFK65CBTI');
    this.load.audio('drum','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/drum.mp3?token=AIEJHUWNNKXYQMDHCQ6MOES65CBYE')
}
function create ()
{
    background=this.add.sprite(800,600,'background');
    this.pin=this.add.sprite(800,150,'pin').setScale(0.25);
    this.pin.depth=1;
    this.stand=this.add.sprite(800,670,'stand').setScale(0.15);
    this.wheel=this.add.sprite(800,400,'mywheel').setScale(0.25).setOrigin(0.5,0.5);
    this.startBtn = this.add.sprite(420,600, 'startBtn').setScale(.50).setInteractive({cursor:'pointer'});
    this.try=this.add.sprite(1200,150,'try').setScale(.50);
    this.yougot=this.add.sprite(800,400,'yougot');
    this.yougot.visible=false;
    this.restart=this.add.sprite(800,400,'restart').setScale(0.30);
    this.restart.visible=false;
    this.soundd=this.sound.add('sound');
    this.drum=this.sound.add('drum');
    this.startBtn.on('pointerdown', spinWheel,this);  
}
function spinWheel(){
    this.startBtn.visible=false;
    this.try.visible=false;
    this.sound.play('sound');
    
    let prizes_config = {
        count:12,
        prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","CB Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
    }
    
    let rounds=Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;

    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    let tween = this.tweens.add({
        targets:this.wheel,
        ease: 'Cubic.easeOut',
        angle: rounds*360 + degrees,
        duration: 7000
    })    
    setTimeout(()=>{
        this.sound.play('drum');
        this.pin.visible=false;
        this.yougot.visible=true;
        this.add.text(500,200, `You got ${prizes_config.prize_names[idx]}! Congratulations :D`,{
            fontSize: '40px',
            fontFamily: 'Arial',
            color: 'red',
            backgroundColor:'white'
        });
        this.restart.visible=true;
        this.input.on("pointerdown",restart,this);
    },7000);
    
}
function restart(){
   this.scene.restart();
    
}
