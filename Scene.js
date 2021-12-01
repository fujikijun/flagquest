//------------------------------------------------------------------------------------------
// SceneTitle
//------------------------------------------------------------------------------------------

let start_timer = 0;

function SceneTitle()
{
  background( 0 );
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  if ( r1 > r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }

  push();
  {
    translate( (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2, (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y );
    scale( w*GLOBAL_SCALING, h*GLOBAL_SCALING );
    messages[0].draw();
  }
  pop();

  start_timer++;
  //if ( start_timer > 30*3 )
  {
    //if ( keyPressed && key == ' ' )
    if ( mouseOn )
    {
      g_soundBGM.loop();
      start_timer = 0;
      SCENE_STATE = STATE_START;

      //--------------------------------------------
      log.Restart();
      //--------------------------------------------
    }
  }
}

//------------------------------------------------------------------------------------------
// SceneStart
//------------------------------------------------------------------------------------------

function SceneStart()
{
  background( 0 );
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  if ( r1 > r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }

  push();
  {
    translate( (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2, (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y );
    scale( w*GLOBAL_SCALING, h*GLOBAL_SCALING );

    g_player.update();
    g_player.draw();
    if ( messages[1].draw() )
    {
      timer++;
    }

    strokeWeight( STROKE_WIDTH );
    stroke( 255 );
    noFill();
    rect( BASE_MAPTIP_SIZE, 0, BASE_SCREEN_WIDTH-BASE_MAPTIP_SIZE*2, BASE_SCREEN_HEIGHT );

    for ( let i=0; i<MASK_NUM; i++ )
    {
      mask[i].draw();
    }
  }
  pop();

  //g_Server.write( g_player.x + "," + g_player.y + "," + g_player.direction + '\n');

  if ( timer > 30*2 )
  {
    timer = 0;
    messages[1].reset();
    SCENE_STATE = STATE_DEFAULT;
  }
}

//------------------------------------------------------------------------------------------
// SceneDefault
//------------------------------------------------------------------------------------------

function SceneDefault()
{
  background( 0 );
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  if ( r1 > r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }

  push();
  {
    translate( (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2, (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y );
    scale( w*GLOBAL_SCALING, h*GLOBAL_SCALING );

    g_player.update();
    g_player.draw();

    strokeWeight( STROKE_WIDTH );
    stroke( 255 );
    noFill();
    rect( BASE_MAPTIP_SIZE, 0, BASE_SCREEN_WIDTH-BASE_MAPTIP_SIZE*2, BASE_SCREEN_HEIGHT );

    for ( let i=0; i<MASK_NUM; i++ )
    {
      mask[i].draw();
    }
  }
  pop();

  //g_Server.write( g_player.x + "," + g_player.y + "," + g_player.direction + '\n');
}

//------------------------------------------------------------------------------------------
// SceneGoal
//------------------------------------------------------------------------------------------

function SceneGoal()
{
  background( 0 );
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  if ( r1 > r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }

  push();
  {
    translate( (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2, (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y );
    scale( w*GLOBAL_SCALING, h*GLOBAL_SCALING );

    g_map.draw(g_player.x, g_player.y, g_player.shift_x, g_player.shift_y );
    if ( messages[4].draw() )
    {
      timer++;
    }
  }
  pop();

  if ( timer > 30*2 )
  {
    timer = 0;
    SCENE_STATE = STATE_SCORE;
  }
}

//------------------------------------------------------------------------------------------
// SceneScore
//------------------------------------------------------------------------------------------

function SceneScore()
{
  background( 0 );
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  if ( r1 > r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }

  push();
  {
    translate( (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2, (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y );
    scale( w*GLOBAL_SCALING, h*GLOBAL_SCALING );
    g_map.draw(g_player.x, g_player.y, g_player.shift_x, g_player.shift_y );
    messages[5].draw(); 

    // time
    if ( this.timer > 30*2 )
    {
      let sizeX = BASE_SCREEN_WIDTH / BASE_MAPTIP_SIZE;
      let sizeY = BASE_SCREEN_HEIGHT / BASE_MAPTIP_SIZE;
      let screen_x = sizeX / 2 * BASE_MAPTIP_SIZE;
      let screen_y = sizeY / 2 * BASE_MAPTIP_SIZE;
      let flog_x = int( screen_x - (sizeX / 2 - 0 ) * BASE_MAPTIP_SIZE )+BASE_MAPTIP_SIZE;
      let flog_y = int( screen_y - (sizeY / 2 - 0 ) * BASE_MAPTIP_SIZE );
      image( g_player.m_imgTime, flog_x+BASE_MAPTIP_SIZE*5, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );

      let strTime = String.format("%03d", (MAX_PLAY_TIME-g_player.play_time) );
      let c = strTime.toCharArray();
      let n = 5;
      let zero = true;

      for ( let i=0; i<c.length; i++ )
      {
        switch( c[i] )
        {
        case '0':
          if ( !zero || i==c.length-1 )
          {
            image( g_player.m_imgNumber[0], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          }
          break;
        case '1':
          zero = false;
          image( g_player.m_imgNumber[1], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '2':
          zero = false;
          image( g_player.m_imgNumber[2], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '3':
          zero = false;
          image( g_player.m_imgNumber[3], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '4':
          zero = false;
          image( g_player.m_imgNumber[4], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '5':
          zero = false;
          image( g_player.m_imgNumber[5], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '6':
          zero = false;
          image( g_player.m_imgNumber[6], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '7':
          zero = false;
          image( g_player.m_imgNumber[7], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '8':
          zero = false;
          image( g_player.m_imgNumber[8], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        case '9':
          zero = false;
          image( g_player.m_imgNumber[9], flog_x+BASE_MAPTIP_SIZE*n+g_player.m_imgNumber[0].width*5+g_player.m_imgNumber[0].width*i, flog_y+BASE_MAPTIP_SIZE*10+g_player.m_imgTime.height );
          break;
        }
      }
    }
  }
  pop();

  timer++;
  if ( timer > 30*8 )
  {
    timer = 0;
    SCENE_STATE = STATE_OVER;
  }
}

//------------------------------------------------------------------------------------------
// SceneOver
//------------------------------------------------------------------------------------------

function SceneOver()
{
  g_soundBGM.stop();

  background( 0 );
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  if ( r1 > r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }

  push();
  {
    translate( (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2, (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y );
    scale( w*GLOBAL_SCALING, h*GLOBAL_SCALING );
    messages[3].draw();
  }
  pop();

  timer++;
  if ( timer > 30*5 )
  {
    timer = 0;
    reset();

    //g_soundBGM.loop();
  }
}