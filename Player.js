//------------------------------------------------------------------------------------------
//
//          Player
//
//------------------------------------------------------------------------------------------

class Player
{
  constructor()
  {    
    this.x = 0;
    this.y = 0;
    this.direction = 0;
    this.shift_x = 0;
    this.shift_y = 0;
    this.state = 0;
    this.speed = 2;
    this.step = 0;
    this.screen_area_x1 = 0;
    this.screen_area_y1 = 0;
    this.screen_area_x2 = 0;
    this.screen_area_y2 = 0;
    this.START_X = 240/2*16;
    this.START_Y = 135/2*16;
    this.STEP_INTERVAL = 30;
    this.play_time = 0;
    this.play_time_speed = 0;
    this.flag = 0;
    this.flag_timer = 0;
    this.m_imgFlagOn = null;
    this.m_imgFlagOff = null;
    this.m_imgTime = null;
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup()
  {
    this.x = 0;
    this.y = 0;
    this.direction = 0;
    this.shift_x = 0;
    this.shift_y = 0;
    this.state = 0;
    this.speed = 2;
    this.step = 0;
    this.screen_area_x1 = 0;
    this.screen_area_y1 = 0;
    this.screen_area_x2 = 0;
    this.screen_area_y2 = 0;
    this.START_X = 240/2*16;
    this.START_Y = 135/2*16;
    this.STEP_INTERVAL = 30;
    this.play_time = 0;
    this.play_time_speed = 0;
    this.flag = 0;
    this.flag_timer = 0;
    this.m_imgFlagOn = null;
    this.m_imgFlagOff = null;
    this.m_imgTime = null;

    this.m_imgPlayer = [];
    for ( let i=0; i<4; i++ )
    {
      this.m_imgPlayer[i] = [];
      for ( let j=0; j<2; j++ )
      {
        this.m_imgPlayer[i][j] = loadImage( "data/player" +i+j+ ".png" );
      }
    }
    this.m_imgFlagOn = loadImage( "data/flag_on.png" );
    this.m_imgFlagOff = loadImage( "data/flag_off.png" );
    this.m_imgTime = loadImage( "data/time.png" );
    this.m_imgNumber = [];
    this.m_imgNumber[0] = loadImage( "data/0.png" );
    this.m_imgNumber[1] = loadImage( "data/1.png" );
    this.m_imgNumber[2] = loadImage( "data/2.png" );
    this.m_imgNumber[3] = loadImage( "data/3.png" );
    this.m_imgNumber[4] = loadImage( "data/4.png" );
    this.m_imgNumber[5] = loadImage( "data/5.png" );
    this.m_imgNumber[6] = loadImage( "data/6.png" );
    this.m_imgNumber[7] = loadImage( "data/7.png" );
    this.m_imgNumber[8] = loadImage( "data/8.png" );
    this.m_imgNumber[9] = loadImage( "data/9.png" );

    this.init();
  }

  //----------------------------------------------------------------------------------------
  // init
  //----------------------------------------------------------------------------------------

  init()
  {
    this.direction = 0;
    this.state = 0;
    this.speed = 2;
    this.step = 0;
    this.play_time = MAX_PLAY_TIME;
    this.play_time_speed = 0;
    this.flag = 0;

    this.sizeX = BASE_SCREEN_WIDTH / BASE_MAPTIP_SIZE;
    this.sizeY = BASE_SCREEN_HEIGHT / BASE_MAPTIP_SIZE;
    this.x = int(this.START_X/BASE_MAPTIP_SIZE)*BASE_MAPTIP_SIZE;
    this.y = int(this.START_Y/BASE_MAPTIP_SIZE)*BASE_MAPTIP_SIZE;

    this.shift_x = int(this.sizeX / 2 ) * BASE_MAPTIP_SIZE;
    this.shift_y = int(this.sizeY / 2 ) * BASE_MAPTIP_SIZE;

    this.screen_area_x1 = int( this.shift_x - (this.sizeX / 2 - 0 ) * BASE_MAPTIP_SIZE )+BASE_MAPTIP_SIZE;
    this.screen_area_y1 = int( this.shift_y - (this.sizeY / 2 - 0 ) * BASE_MAPTIP_SIZE );
    this.screen_area_x2 = int( this.shift_x + (this.sizeX / 2 - 0 ) * BASE_MAPTIP_SIZE )-BASE_MAPTIP_SIZE;
    this.screen_area_y2 = int( this.shift_y + (this.sizeY / 2 - 0 ) * BASE_MAPTIP_SIZE );
  }

  //----------------------------------------------------------------------------------------
  // update
  //----------------------------------------------------------------------------------------

  update()
  { 

    this.step++;
    if ( this.step >= this.STEP_INTERVAL )
    {
      this.step = 0;
    }

    // flag
    if ( this.flag_timer > 0 )
    {
      return;
    }

    //console.log(this.shift_x,this.shift_y,this.screen_area_x1,this.screen_area_y1,this.screen_area_x2,this.screen_area_y2);
    //console.log( this.x, this.y, this.shift_x, this.shift_y, this.screen_area_x1, this.screen_area_y1, this.screen_area_x2, this.screen_area_y2 );


    switch( this.state )
    {
    case 0:

      if ( this.shift_x<this.screen_area_x1 || this.shift_x>this.screen_area_x2 || this.shift_y<this.screen_area_y1 || this.shift_y>this.screen_area_y2 )
      {
        return;
      }

      this.x = int(this.x / BASE_MAPTIP_SIZE) * BASE_MAPTIP_SIZE;
      this.y = int(this.y / BASE_MAPTIP_SIZE) * BASE_MAPTIP_SIZE;
      this.shift_x = int(this.shift_x / BASE_MAPTIP_SIZE) * BASE_MAPTIP_SIZE;
      this.shift_y = int(this.shift_y / BASE_MAPTIP_SIZE) * BASE_MAPTIP_SIZE;

      {
        if ( keyIsPressed && keyCode === RIGHT_ARROW )
        {
          //if ( screen_x < screen_area_x2 )
          this.state = 1;
        }
        if ( keyIsPressed && keyCode === LEFT_ARROW )
        {
          //if ( screen_x > screen_area_x1 )
          this.state = 2;
        }
        if ( keyIsPressed && keyCode === DOWN_ARROW )
        {
          //if ( screen_y < screen_area_y2 )
          this.state = 3;
        }
        if ( keyIsPressed && keyCode === UP_ARROW )
        {
          //if ( screen_y > screen_area_y1 )
          this.state = 4;
        }
        if ( keyIsPressed && keyCode === SHIFT )
        {
          reset();
        }
      }

      switch( this.state )
      {
      case 1:
        {
          this.direction = 3;
        }
        break;

      case 2:
        {
          this.direction = 1;
        }
        break;

      case 3:
        {
          this.direction = 0;
        }
        break;

      case 4:
        {
          this.direction = 2;
        }
        break;
      }

      //if ( FILED_STATE == 0 )
      {
        switch( this.state )
        {
        case 1:
          if ( !g_map.isMove( this.x+BASE_MAPTIP_SIZE, this.y, this.shift_x+BASE_MAPTIP_SIZE, this.shift_y ) )
          {
            this.state = 0;
          }
          break;
        case 2:
          if ( !g_map.isMove(this.x-BASE_MAPTIP_SIZE, this.y, this.shift_x-BASE_MAPTIP_SIZE, this.shift_y ) )
          {
            this.state = 0;
          }
          break;
        case 3:
          if ( !g_map.isMove(this.x, this.y+BASE_MAPTIP_SIZE, this.shift_x, this.shift_y+BASE_MAPTIP_SIZE ) )
          {
            this.state = 0;
          }
          break;
        case 4:
          if ( !g_map.isMove(this.x, this.y-BASE_MAPTIP_SIZE, this.shift_x, this.shift_y-BASE_MAPTIP_SIZE ) )
          {
            this.state = 0;
          }
          break;
        }
      }
    }

    if ( FILED_STATE == 0 )
    {
      switch( this.state )
      {
      case 1:
        {
          this.x += this.speed;
          if ( this.x%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
          }
        }
        break;

      case 2:
        {
          this.x -= this.speed;
          if ( this.x%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
          }
        }
        break;

      case 3:
        {
          this.y += this.speed;
          if ( this.y%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
          }
        }
        break;

      case 4:
        {
          this.y -= this.speed;
          if ( this.y%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
          }
        }
        break;
      }
    } else
    {
      switch( this.state )
      {
      case 1:
        {
          this.x += this.speed;
          this.shift_x += this.speed;
          if ( int(this.x)%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
            if ( this.shift_x >= this.screen_area_x2 )
            {
              this.shift_x -= (this.screen_area_x2-this.screen_area_x1);
              this.x -= (this.screen_area_x2-this.screen_area_x1);
            }
          }
        }
        break;

      case 2:
        {
          this.x -= this.speed;
          this.shift_x -= this.speed;
          if ( int(this.x)%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
            if ( this.shift_x <= this.screen_area_x1-BASE_MAPTIP_SIZE )
            {
              this.shift_x += (this.screen_area_x2-this.screen_area_x1);
              this.x += (this.screen_area_x2-this.screen_area_x1);
            }
          }
        }
        break;

      case 3:
        {
          this.y += this.speed;
          this.shift_y += this.speed;
          if ( int(this.y)%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
            if ( this.shift_y >= this.screen_area_y2 )
            {
              this.shift_y -= (this.screen_area_y2-this.screen_area_y1);
              this.y -= (this.screen_area_y2-this.screen_area_y1);
            }
          }
        }
        break;

      case 4:
        {
          this.y -= this.speed;
          this.shift_y -= this.speed;
          if ( int(this.shift_y)%BASE_MAPTIP_SIZE == 0 )
          {
            this.state = 0;
            if ( this.shift_y <= this.screen_area_y1-BASE_MAPTIP_SIZE )
            {
              this.shift_y += (this.screen_area_y2-this.screen_area_y1);
              this.y += (this.screen_area_y2-this.screen_area_y1);
            }
          }
        }
        break;
      }
    }

    // goal
    //if ( FILED_STATE == 0 )
    {
      for ( let i=0; i<g_map.vecGoal.length; i++ )
      {
        if ( this.x==g_map.vecGoal[i].x && this.y==g_map.vecGoal[i].y && !g_map.vecGoal[i].on )
        {
          g_map.vecGoal[i].on = true;
          this.flag++;
          if ( this.flag == g_map.vecGoal.length )
          {
            SCENE_STATE = STATE_GOAL;
              
             g_soundBGM.stop();
             g_soundGoal.play();
             
          } else
          {
            this.flag_timer = FLAG_SHOW_TIME;
                
             g_soundGet.play();
             
          }
        }
      }
    }

    // time
    this.play_time_speed++;
    if ( this.play_time_speed > 60 )
    {
      this.play_time_speed = 0;
      this.play_time--;
    }
  }

  //----------------------------------------------------------------------------------------1
  // draw
  //----------------------------------------------------------------------------------------

  draw()
  {
    g_map.draw(this.x, this.y, this.shift_x, this.shift_y );

    let a = int(this.direction);
    let b = int(this.step/(this.STEP_INTERVAL/2));
    image( this.m_imgPlayer[a][b], this.shift_x, this.shift_y );

    if ( FILED_STATE != 0 )
    {
      if ( this.state != 0 )
      {
        let x, y;
        x = this.shift_x+(this.screen_area_x2-this.screen_area_x1);
        y = this.shift_y;
        if ( !( x<this.screen_area_x1-BASE_MAPTIP_SIZE || x>this.screen_area_x2 || y<this.screen_area_y1-BASE_MAPTIP_SIZE || y>this.screen_area_y2 ) )
        {
          image( this.m_imgPlayer[a][b], x, y );
        }
        x = this.shift_x-(this.screen_area_x2-this.screen_area_x1);
        y = this.shift_y;
        if ( !( x<this.screen_area_x1-BASE_MAPTIP_SIZE || x>this.screen_area_x2 || y<this.screen_area_y1-BASE_MAPTIP_SIZE || y>this.screen_area_y2 ) )
        {
          image( this.m_imgPlayer[a][b], x, y );
        }
        x = this.shift_x;
        y = this.shift_y-(this.screen_area_y2-this.screen_area_y1);
        if ( !( x<this.screen_area_x1-BASE_MAPTIP_SIZE || x>this.screen_area_x2 || y<this.screen_area_y1-BASE_MAPTIP_SIZE || y>this.screen_area_y2 ) )
        {
          image( this.m_imgPlayer[a][b], x, y );
        }
        x = this.shift_x;
        y = this.shift_y+(this.screen_area_y2-this.screen_area_y1);
        if ( !( x<this.screen_area_x1-BASE_MAPTIP_SIZE || x>this.screen_area_x2 || y<this.screen_area_y1-BASE_MAPTIP_SIZE || y>this.screen_area_y2 ) )
        {
          image( this.m_imgPlayer[a][b], x, y );
        }
      }
    }

    // flag
    let sizeX = BASE_SCREEN_WIDTH / BASE_MAPTIP_SIZE;
    let sizeY = BASE_SCREEN_HEIGHT / BASE_MAPTIP_SIZE;
    let screen_x = this.sizeX / 2 * BASE_MAPTIP_SIZE;
    let screen_y = this.sizeY / 2 * BASE_MAPTIP_SIZE;
    let flog_x = int( this.screen_x - (this.sizeX / 2 - 0 ) * BASE_MAPTIP_SIZE )+BASE_MAPTIP_SIZE;
    let flog_y = int( this.screen_y - (this.sizeY / 2 - 0 ) * BASE_MAPTIP_SIZE );
    let flog_x2 = flog_x - this.m_imgFlagOff.width*1;
    let flog_y2 = flog_y - BASE_MAPTIP_SIZE;
    for ( let i=0; i<g_map.gindex; i++ )
    {
      if ( i%FLAG_RETURN_NUM == 0 )
      {
        flog_x2 = flog_x-this.m_imgFlagOff.width*1;
        flog_y2 += BASE_MAPTIP_SIZE;
      }
      flog_x2 += this.m_imgFlagOff.width;
      image( this.m_imgFlagOff, flog_x2 + this.m_imgFlagOff.width/2, flog_y2 + this.m_imgFlagOff.height/2 );
    }
    flog_x2 = flog_x-this.m_imgFlagOff.width*1;
    flog_y2 = flog_y - BASE_MAPTIP_SIZE;
    for ( let i=0; i<this.flag; i++ )
    {
      if ( i%FLAG_RETURN_NUM == 0 )
      {
        flog_x2 = flog_x-this.m_imgFlagOff.width*1;
        flog_y2 += BASE_MAPTIP_SIZE;
      }
      flog_x2 += this.m_imgFlagOff.width;
      image( this.m_imgFlagOn, flog_x2 + this.m_imgFlagOff.width/2, flog_y2 + this.m_imgFlagOff.height/2 );
    }

    this.flag_timer--;
    if ( this.flag_timer > 0 )
    {
      messages[2].draw();
    } else
    {
      this.flag_timer = 0;
    }

    // time
    flog_y += BASE_MAPTIP_SIZE;
    image( this.m_imgTime, flog_x+BASE_MAPTIP_SIZE*9, flog_y+this.m_imgTime.height/2 );
    //let strTime = String.format("%03d", this.play_time );
    //let c = strTime.toCharArray();
    let c1 = int( this.play_time / 100 );
    let c2 = int( ( this.play_time - c1*100 ) / 10 );
    let c3 = int( this.play_time - c1*100 - c2*10 );
    
    for ( let i=0; i<3; i++ )
    {
      let c;
      if( i == 0 )
      {
        c = c1;
      }
      else if( i == 1 )
      {
        c = c2;
      }
      else
      {
        c = c3;
      }
      
      switch( c )
      {
      case 0:
        image( this.m_imgNumber[0], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 1:
        image( this.m_imgNumber[1], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 2:
        image( this.m_imgNumber[2], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 3:
        image( this.m_imgNumber[3], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 4:
        image( this.m_imgNumber[4], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 5:
        image( this.m_imgNumber[5], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 6:
        image( this.m_imgNumber[6], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 7:
        image( this.m_imgNumber[7], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 8:
        image( this.m_imgNumber[8], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      case 9:
        image( this.m_imgNumber[9], flog_x+BASE_MAPTIP_SIZE*9+this.m_imgNumber[0].width*5+this.m_imgNumber[0].width*i, flog_y+this.m_imgTime.height/2 );
        break;
      }
    }

    // time over
    if ( this.play_time < 0 )
    {
      SCENE_STATE = STATE_OVER;
    }
  }
}