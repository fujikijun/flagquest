//------------------------------------------------------------------------------------------
//
//          Map
//
//------------------------------------------------------------------------------------------

class CTip
{
  constructor()
  {
    this.img = null;
    this.type = 0;
  }
}

class Goal
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.on = false;
    this.get_time = 0;
    this.use_mask_num = 0;
    this.get_count = 0;
    this.move_num = 0;
    this.warp_num = 0;
  }
}

class Map
{
  constructor()
  {
    this.m_imgMapTip = null;
    this.m_imgGoal = null;
    this.vecGoal = [];

    this.TIP_NUM = 6;
    this.SIZE_X = 240;
    this.SIZE_Y = 135;
    this.imgTip = [];
    this.gindex = 0;
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup( mapFileName )
  {
    this.m_imgMapTip = null;
    this.m_imgGoal = null;
    this.vecGoal = [];

    this.TIP_NUM = 6;
    this.SIZE_X = 240;
    this.SIZE_Y = 135;
    this.gindex = 0;

    this.imgTip = [];
    for ( let i=0; i<this.TIP_NUM; i++ )
    {
      this.imgTip[i] = loadImage( "data/tip"+i+".png" );
    }
    this.imgMap = loadImage( mapFileName );
    this.m_imgGoal = loadImage( "data/goal.png" );
  }

  //----------------------------------------------------------------------------------------
  // create
  //----------------------------------------------------------------------------------------

  create()
  {
    this.mapTip = [];
    this.SIZE_X = this.imgMap.width;
    this.SIZE_Y = this.imgMap.height;

    this.imgMap.loadPixels();

    for ( let x=0; x<this.SIZE_X; x++ )
    {
      this.mapTip[x] = [];

      for ( let y=0; y<this.SIZE_Y; y++ )
      {
        this.mapTip[x][y] = new CTip();

        let col = this.imgMap.get(x, y);//pixels[x+y*this.imgMap.width];
        let r = int(red(col));
        let g = int(green(col));
        let b = int(blue(col));

        if ( r==0 && g==0 && b==255 )//sea
        {
          this.mapTip[x][y].img = this.imgTip[3];
          this.mapTip[x][y].type = 3;
        } else if ( r==0 && g==128 && b==0 )//forest
        {
          this.mapTip[x][y].img = this.imgTip[1];
          this.mapTip[x][y].type = 1;
        } else if ( r==255 && g==255 && b==0 )//desert
        {
          this.mapTip[x][y].img = this.imgTip[5];
          this.mapTip[x][y].type = 5;
        } else if ( r==128 && g==128 && b==128 )//rock
        {
          this.mapTip[x][y].img = this.imgTip[2];
          this.mapTip[x][y].type = 2;
        } else if ( r==128 && g==0 && b==0 )//mountain
        {
          this.mapTip[x][y].img = this.imgTip[4];
          this.mapTip[x][y].type = 4;
        } else if ( r==255 && g==0 && b==0 )//flag
        {
          let goal = new Goal();
          goal.x = x*BASE_MAPTIP_SIZE;
          goal.y = y*BASE_MAPTIP_SIZE;
          this.vecGoal[this.gindex] = goal;
          this.mapTip[x][y].img = this.imgTip[0];
          this.mapTip[x][y].type = 0;
          this.gindex++;
        } else if ( r==0 && g==255 && b==255 )//start
        {
          g_player.START_X = x*BASE_MAPTIP_SIZE;
          g_player.START_Y = y*BASE_MAPTIP_SIZE;
          g_player.x = x*BASE_MAPTIP_SIZE;
          g_player.y = y*BASE_MAPTIP_SIZE;
          this.mapTip[x][y].img = this.imgTip[0];
          this.mapTip[x][y].type = 0;
        } else // grass
        {
          this.mapTip[x][y].img = this.imgTip[0];
          this.mapTip[x][y].type = 0;
        }
      }
    }
  }

  //----------------------------------------------------------------------------------------
  // rest
  //----------------------------------------------------------------------------------------

  reset()
  {
    for ( let i=0; i<this.vecGoal.length; i++ )
    {
      this.vecGoal[i].on = false;
      this.vecGoal[i].get_time = 0;
      this.vecGoal[i].use_mask_num = 0;
      this.vecGoal[i].get_count = 0;
      this.vecGoal[i].move_num = 0;
      this.vecGoal[i].warp_num = 0;
    }
  }

  //----------------------------------------------------------------------------------------
  // isMove
  //----------------------------------------------------------------------------------------

  isMove( ppx, ppy, shift_x, shift_y )
  {
    let px = ppx;
    let py = ppy;
    if ( shift_x >= g_player.screen_area_x2 )
    {
      px -= (g_player.screen_area_x2-g_player.screen_area_x1);
    }

    if ( shift_x <= g_player.screen_area_x1-BASE_MAPTIP_SIZE )
    {
      px += (g_player.screen_area_x2-g_player.screen_area_x1);
    }

    if ( shift_y >= g_player.screen_area_y2 )
    {
      py -= (g_player.screen_area_y2-g_player.screen_area_y1);
    }

    if ( shift_y <= g_player.screen_area_y1-BASE_MAPTIP_SIZE )
    {
      py += (g_player.screen_area_y2-g_player.screen_area_y1);
    }

    let x = int( px / BASE_MAPTIP_SIZE );
    let y = int( py / BASE_MAPTIP_SIZE );

    if ( x<0 || y<0 )
    {
      return false;
    }
    if ( x>=this.SIZE_X || y>=this.SIZE_Y )
    {
      return false;
    }

    if ( this.mapTip[x][y].type==2 || this.mapTip[x][y].type==3 )
    {
      return false;
    }

    return true;
  }

  isMove2( screen_x, screen_y, screen_area_x1, screen_area_y1, screen_area_x2, screen_area_y2 )
  {
    if ( screen_x >= screen_area_x2 )
    {
      screen_x -= (screen_area_x2-screen_area_x1);
      println( "1");
    }

    if ( screen_x <= screen_area_x1-BASE_MAPTIP_SIZE )
    {
      screen_x += (screen_area_x2-screen_area_x1);
      println( "2");
    }

    if ( screen_y >= screen_area_y2 )
    {
      screen_y -= (screen_area_y2-screen_area_y1);
      println( "3");
    }

    if ( screen_y <= screen_area_y1-BASE_MAPTIP_SIZE )
    {
      screen_y += (screen_area_y2-screen_area_y1);
      println( "4");
    }

    //println( screen_x + ", " + screen_y); 

    let x = int( (g_player.x+screen_x)/BASE_MAPTIP_SIZE-(BASE_SCREEN_WIDTH/2/BASE_MAPTIP_SIZE) );
    let y = int( (g_player.y+screen_y)/BASE_MAPTIP_SIZE-(BASE_SCREEN_HEIGHT/2/BASE_MAPTIP_SIZE) );

    println( x + ", " + y);    

    if ( x<0 || y<0 )
    {
      return false;
    }
    if ( x>=SIZE_X || y>=SIZE_Y )
    {
      return false;
    }
    if ( this.mapTip[x][y].type==2 || this.mapTip[x][y].type==3 )
    {
      return false;
    }
    println("___");    
    return true;
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw( px, py, shift_x, shift_y )
  {
    background( 0 );

    push();
    translate( shift_x, shift_y );
    {
      for ( let y=0; y<this.SIZE_Y; y++ )
      {
        for ( let x=0; x<this.SIZE_X; x++ )
        {          
          
          if ( x < int(px)/BASE_MAPTIP_SIZE-28-(shift_x-BASE_SCREEN_WIDTH/2)/BASE_MAPTIP_SIZE )
           {
           continue;
           }
           if ( x > int(px)/BASE_MAPTIP_SIZE+28-(shift_x-BASE_SCREEN_WIDTH/2)/BASE_MAPTIP_SIZE )
           {
           continue;
           }
           if ( y < int(py)/BASE_MAPTIP_SIZE-16-(shift_y-BASE_SCREEN_HEIGHT/2)/BASE_MAPTIP_SIZE )
           {
           continue;
           }
           if ( y > int(py)/BASE_MAPTIP_SIZE+16-(shift_y-BASE_SCREEN_HEIGHT/2)/BASE_MAPTIP_SIZE )
           {
           continue;
           }
           
          image( this.mapTip[x][y].img, x*BASE_MAPTIP_SIZE-px, y*BASE_MAPTIP_SIZE-py );
        }
      }

      for ( let i=0; i<this.vecGoal.length; i++ )
      {
        if ( !this.vecGoal[i].on )
        {
          image( this.m_imgGoal, this.vecGoal[i].x-px, this.vecGoal[i].y-py );
        }
      }
    }
    pop();
  }
}