//-------------------------------------------------------------------------
//
// flagquest for Processing
//
// You can download Processing at the following URL.
//                           https://processing.org/
//                                                            by Jun Fujiki
//
//-------------------------------------------------------------------------

let canvas;
let cPosX=0, cPosY=0;
let smafo = false;

let MAX_PLAY_TIME = 999;
let BASE_SCREEN_WIDTH = 256;
let BASE_SCREEN_HEIGHT = 224;
let BASE_DISPLAY_WIDTH = 960*0.9;
let BASE_DISPLAY_HEIGHT = 540*0.9;
let BASE_MAPTIP_SIZE = 16;
let FLAG_RETURN_NUM = 13;
let STATE_TITLE = 0;
let STATE_START = 1;
let STATE_DEFAULT = 2;
let STATE_GOAL = 3;
let STATE_SCORE = 4;
let STATE_OVER = 5;

let SCALE_BIAS = 0.5;
let STROKE_WIDTH = 4;
let MASK_NUM = 1;

/*
let g_Minim;
 */
let g_soundBGM;
let g_soundGet;
let g_soundGoal;

let g_map;
let g_player;
let mask = [];
let messages = [];
let currentMask = null;
let imgCursor;

let CURRENT_MASK = 0;
let CURRENT_MASK_UPSIDE = 0;
let FILED_STATE = 0;
let SCENE_STATE = STATE_TITLE;
let timer = 0;
let TITLE_SPEED = 0.05;
let MESSAGE_SPEED = 0.25;
let GOAL_SPEED = 0.15;
let FLAG_SHOW_TIME = 30;
let GLOBAL_SCALING = 1;////0.90;
let GLOBAL_POS_Y = 0;
let GLOBAL_MAP_FILENAME = "";

let mask_base_x = 0;
let mask_base_y = 0;
let mouseOn = false;

let log;
let imgOutputLog;

function beforeUnload(event)
{
  /*
  //--------------------------------------------
  log.WriteFish();
  //--------------------------------------------
  event.preventDefault();
  event.returnValue = 'Check';
  */
}

window.onbeforeunload = beforeUnload;


//-------------------------------------------------------------------------
// preload
//-------------------------------------------------------------------------

function preload() 
{
  GLOBAL_POS_Y = 0;
  GLOBAL_MAP_FILENAME = "data/fieldE1.png";
  MAX_PLAY_TIME = 999;

  /*
  g_Minim = new Minim(this);
   */
  g_soundGet = loadSound( 'data/get.mp3' );
  g_soundGoal = loadSound( 'data/goal.mp3' );
  g_soundBGM = loadSound( 'data/bgm.wav' );

  g_player = new Player();
  g_player.setup();
  g_map = new Map();
  g_map.setup( GLOBAL_MAP_FILENAME );
  mask[0] = new Mask();
  for ( let i=0; i<MASK_NUM; i++ )
  {
    mask[i].setup( "data/mask"+(i+1) );
    mask[i].index = i;
  }

  {
    messages[0] = new Message();
    messages[0].setup( 0, 2 );

    messages[1] = new Message();
    messages[1].setup( 1, 9 );

    messages[2] = new Message();
    messages[2].setup( 2, 1 );

    messages[3] = new Message();
    messages[3].setup( 3, 1 );

    messages[4] = new Message();
    messages[4].setup( 4, 29 );

    messages[5] = new Message();
    messages[5].setup( 5, 1 );
  }

  imgCursor = loadImage( "data/cursor.png" );
  imgOutputLog = loadImage( "data/outputlog.png" );
}

//------------------------------------------------------------------------------------------
// reset
//------------------------------------------------------------------------------------------

function reset()
{
  SCENE_STATE = STATE_TITLE;
  CURRENT_MASK = 0;
  CURRENT_MASK_UPSIDE = 0;
  FILED_STATE = 0;

  g_soundBGM.stop();

  g_player.init();
  g_map.reset();
  for ( let i=0; i<messages.length; i++ )
  {
    messages[i].reset();
  }
}

//-------------------------------------------------------------------------
// setup
//-------------------------------------------------------------------------

function setup()
{
  canvas = createCanvas( windowWidth, windowHeight );  
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');

  let userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('iphone') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('ipad') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('android') != -1) {
    if (userAgent.indexOf('mobile') != -1) {
      smafo = true;
    } else {
      smafo = true;
    }
  }

  if ( smafo == true )
  {
    canvas.style('position', 'scroll');
  }

  background( 127 );
  noSmooth();

  frameRate( 30 );

  g_map.create();
  for ( let i=0; i<MASK_NUM; i++ )
  {
    mask[i].create();
  }

  for ( let i=0; i<6; i++ )
  {
    //messages[i].create();
  }

  mask[0].x = -(mask[0].imgMask.width+2)*BASE_MAPTIP_SIZE;
  messages[0].loop = true;
  messages[0].message_speed = TITLE_SPEED;
  messages[2].loop = true;
  messages[2].message_speed = TITLE_SPEED;
  messages[3].loop = true;
  messages[3].message_speed = TITLE_SPEED;
  messages[4].message_speed = GOAL_SPEED;
  messages[5].loop = true;
  messages[5].message_speed = TITLE_SPEED;
  //g_player.init();

  log = new Log();
}

//-------------------------------------------------------------------------
// draw
//-------------------------------------------------------------------------

function draw()
{
  switch( SCENE_STATE )
  {
  case STATE_TITLE:
    SceneTitle();
    break;
  case STATE_START:
    SceneStart();
    break;
  case STATE_DEFAULT:
    SceneDefault();
    break;
  case STATE_GOAL:
    SceneGoal();
    break;
  case STATE_SCORE:
    SceneScore();
    break;
  case STATE_OVER:
    SceneOver();
    break;
  }

  let m = null;
  for ( let i=0; i<MASK_NUM; i++ )
  {
    if ( mask[i].fit )
    {
      m = mask[i];
      break;
    }
  }

  if ( m == null )
  {
    changeMask( 0, CURRENT_MASK, CURRENT_MASK_UPSIDE );
  } else
  {
    changeMask( m.rotate, m.index, m.upside );
  }

  //image( imgCursor, mouseX, mouseY );
  push();
  translate( 8, 8 );
  scale( 2, 2 );
  image( imgOutputLog, 0, 0 );
  pop();
}

//-------------------------------------------------------------------------
// windowResized
//-------------------------------------------------------------------------

function windowResized() 
{ 
  let userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('iphone') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('ipad') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('android') != -1) {
    if (userAgent.indexOf('mobile') != -1) {
      smafo = true;
    } else {
      smafo = true;
    }
  }

  if ( smafo == true )
  {
    if ( canvas != null )
    {
      canvas.style('position', 'fixed');
    }
    return;
  }

  canvas = createCanvas( windowWidth, windowHeight );
  canvas.style('z-index', '-1');
  if ( smafo == false )
  {
    canvas.style('position', 'fixed');
  }
  canvas.style('top', '0');
  canvas.style('left', '0');

  noSmooth();

  frameRate( 30 );
}

/*
//------------------------------------------------------------------------------------------
 // keyPressed
 //------------------------------------------------------------------------------------------
 
 function keyPressed()
 {
 if ( g_player.state == 0 )
 {
 switch( key )
 {
 case '7':  
 {
 //save( "back.png" );
 }
 break;
 
 case '9':  
 {
 let old_field_mask = CURRENT_MASK;
 old_field_mask++;
 if ( old_field_mask >= mask.length )
 {
 old_field_mask = 0;
 }
 changeMask( FILED_STATE, old_field_mask, CURRENT_MASK_UPSIDE );
 }
 break;
 case '8':  
 {
 let old_field_upside = CURRENT_MASK_UPSIDE;
 old_field_upside++;
 if ( old_field_upside >= 2 )
 {
 old_field_upside = 0;
 }
 changeMask( FILED_STATE, CURRENT_MASK, old_field_upside );
 }
 break;
 
 case '0':
 changeMask( 0, CURRENT_MASK, CURRENT_MASK_UPSIDE );
 break;
 case '1':
 changeMask( 1, CURRENT_MASK, CURRENT_MASK_UPSIDE );
 break;
 case '2':
 changeMask( 2, CURRENT_MASK, CURRENT_MASK_UPSIDE );
 break;
 case '3':  
 changeMask( 3, CURRENT_MASK, CURRENT_MASK_UPSIDE );
 break;
 case '4':
 changeMask( 4, CURRENT_MASK, CURRENT_MASK_UPSIDE );
 break;
 }
 }
 }
 */
function changeMask( index, type, upside )
{
  let old_field_state = FILED_STATE;
  let old_field_mask = CURRENT_MASK;
  let old_field_upside = CURRENT_MASK_UPSIDE;
  FILED_STATE = index; 
  CURRENT_MASK = type;
  CURRENT_MASK_UPSIDE = upside;

  let sizeX = int(BASE_SCREEN_WIDTH / BASE_MAPTIP_SIZE);
  let sizeY = int(BASE_SCREEN_HEIGHT / BASE_MAPTIP_SIZE);
  //float x = g_player.START_X/BASE_MAPTIP_SIZE*BASE_MAPTIP_SIZE;
  //float y = g_player.START_Y/BASE_MAPTIP_SIZE*BASE_MAPTIP_SIZE;
  let screen_x = sizeX / 2 * BASE_MAPTIP_SIZE;
  let screen_y = sizeY / 2 * BASE_MAPTIP_SIZE;

  let w = int(mask[CURRENT_MASK].w);
  let h = int(mask[CURRENT_MASK].h);
  let x1 = int(mask[CURRENT_MASK].x1);
  let y1 = int(mask[CURRENT_MASK].y1);
  let x2 = int(mask[CURRENT_MASK].x2);
  let y2 = int(mask[CURRENT_MASK].y2);
  if ( upside == 1 )
  {
    x1 = int(mask[CURRENT_MASK].x1);
    y1 = h-int(mask[CURRENT_MASK].y2);
    x2 = int(mask[CURRENT_MASK].x2);
    y2 = h-int(mask[CURRENT_MASK].y1);
  }

  switch( index )
  {
  case 0:  
    g_player.screen_area_x1 = int( screen_x - (sizeX / 2 - 0 ) * BASE_MAPTIP_SIZE )+BASE_MAPTIP_SIZE;
    g_player.screen_area_y1 = int( screen_y - (sizeY / 2 - 0 ) * BASE_MAPTIP_SIZE );
    g_player.screen_area_x2 = int( screen_x + (sizeX / 2 - 0 ) * BASE_MAPTIP_SIZE )-BASE_MAPTIP_SIZE;
    g_player.screen_area_y2 = int( screen_y + (sizeY / 2 - 0 ) * BASE_MAPTIP_SIZE );
    break;
  case 1:  
    g_player.screen_area_x1 = BASE_MAPTIP_SIZE*(y1+1);
    g_player.screen_area_y1 = BASE_MAPTIP_SIZE*(x1);
    g_player.screen_area_x2 = BASE_MAPTIP_SIZE*(y2+1);
    g_player.screen_area_y2 = BASE_MAPTIP_SIZE*(x2);
    break;
  case 2:  
    g_player.screen_area_x1 = BASE_MAPTIP_SIZE*(w-x2+1);
    g_player.screen_area_y1 = BASE_MAPTIP_SIZE*(y1);
    g_player.screen_area_x2 = BASE_MAPTIP_SIZE*(w-x1+1);
    g_player.screen_area_y2 = BASE_MAPTIP_SIZE*(y2);
    break;
  case 3:  
    g_player.screen_area_x1 = BASE_MAPTIP_SIZE*(h-y2+1);
    g_player.screen_area_y1 = BASE_MAPTIP_SIZE*(w-x2);
    g_player.screen_area_x2 = BASE_MAPTIP_SIZE*(h-y1+1);
    g_player.screen_area_y2 = BASE_MAPTIP_SIZE*(w-x1);
    break;
  case 4:  
    g_player.screen_area_x1 = BASE_MAPTIP_SIZE*(x1+1);
    g_player.screen_area_y1 = BASE_MAPTIP_SIZE*(h-y2);
    g_player.screen_area_x2 = BASE_MAPTIP_SIZE*(x2+1);
    g_player.screen_area_y2 = BASE_MAPTIP_SIZE*(h-y1);
    break;
  }

  if ( ( FILED_STATE!=0 && old_field_state!=FILED_STATE ) || (old_field_mask!=CURRENT_MASK) || (old_field_upside!=CURRENT_MASK_UPSIDE) )
  {
    g_player.log_iUseMaskCount++;
    g_player.log_iUseMaskStartTime = millis() - log.m_iStartTime;
    //--------------------------------------------
    log.WriteEvent( 3 );

    if ( !g_player.used_mask )
    {
      g_player.used_mask = true;
      g_player.log_iUseMaskFirstTime = g_player.log_iUseMaskStartTime;
    }
    //--------------------------------------------
  }
  if ( FILED_STATE==0 && old_field_state!=FILED_STATE )
  {
    let t = millis() - g_player.log_iUseMaskStartTime;
    g_player.log_iUseMaskTotalTime += t;
    //--------------------------------------------
    log.WriteEvent( 4 );
    //--------------------------------------------
  }
  //console.log(g_player.screen_area_x1,g_player.screen_area_y1,g_player.screen_area_x2,g_player.screen_area_y2);
}

function mousePressed()
{
  for ( let i=0; i<mask.length; i++ )
  {
    mask[i].action( mouseX, mouseY );
  }

  for ( let i=0; i<mask.length; i++ )
  {
    if ( mask[i].hitTest( mouseX, mouseY ) )
    {
      currentMask = mask[i];
      currentMask.on = true;
      currentMask.fit = false;
      mask_base_x = currentMask.x - currentMask.convx( mouseX );
      mask_base_y = currentMask.y - currentMask.convy( mouseY );
      break;
    }
  }

  mouseOn = true;
  
  if( mouseX>8 && mouseY>8 && mouseX<8+16*2 && mouseY<8+16*2 )
  {
    log.WriteFish();
  }
}

function mouseDragged()
{
  if ( currentMask != null )
  {
    currentMask.oldx = currentMask.x;
    currentMask.oldy = currentMask.y;
    currentMask.x = mask_base_x + currentMask.convx( mouseX );
    currentMask.y = mask_base_y + currentMask.convy( mouseY );

    if ( currentMask.x <= -(mask[0].imgMask.width+2)*BASE_MAPTIP_SIZE )
    {
      currentMask.x = -(mask[0].imgMask.width+2)*BASE_MAPTIP_SIZE;
    }
    if ( currentMask.x>= (mask[0].imgMask.width+2)*BASE_MAPTIP_SIZE )
    {
      currentMask.x = (mask[0].imgMask.width+2)*BASE_MAPTIP_SIZE;
    }
    if ( currentMask.y <= -(4)*BASE_MAPTIP_SIZE )
    {
      currentMask.y = -(4)*BASE_MAPTIP_SIZE;
    }
    if ( currentMask.y>= (4+1)*BASE_MAPTIP_SIZE )
    {
      currentMask.y = (4+1)*BASE_MAPTIP_SIZE;
    }
  }
}

function mouseReleased()
{
  if ( currentMask != null )
  {
    currentMask.attach();
    currentMask.on = false;
  }
  currentMask = null;

  mouseOn = false;
}