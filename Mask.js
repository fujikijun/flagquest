//------------------------------------------------------------------------------------------
//
//          Mask
//
//------------------------------------------------------------------------------------------

class Mask
{
  constructor()
  {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.w = 0;
    this.h = 0;
    this.imgMask = null;
    this.imgRotate = null;
    this.imgInv = null;
    this.x = 0;
    this.y = 0;
    this.oldx = 0;
    this.oldy = 0;
    this.mask_float = BASE_MAPTIP_SIZE/2;

    this.index = 0;
    this.rotate = 1;
    this.upside = 0;
    this.on = false;
    this.fit = false;

    this.x = 0;
    this.y = 0;
    this.oldx = this.x;
    this.oldy = this.y;
    this.x1 = 999;
    this.y1 = 999;
    this.x2 = -999;
    this.y2 = -999;
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup( filename )
  {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.w = 0;
    this.h = 0;
    this.x = 0;
    this.y = 0;
    this.oldx = 0;
    this.oldy = 0;
    this.mask_float = BASE_MAPTIP_SIZE/2;

    this.index = 0;
    this.rotate = 1;
    this.upside = 0;
    this.on = false;
    this.fit = false;

    this.x = 0;
    this.y = 0;
    this.oldx = this.x;
    this.oldy = this.y;
    this.x1 = 999;
    this.y1 = 999;
    this.x2 = -999;
    this.y2 = -999;

    this.imgRotate = loadImage( "data/rotate.png" );
    this.imgInv = loadImage( "data/inv.png" );

    this.img = loadImage( filename+".png" );
    this.imgMask = loadImage( filename+"s.png" );
  }

  //----------------------------------------------------------------------------------------
  // create
  //----------------------------------------------------------------------------------------

  create()
  {
    this.img.loadPixels();
    this.w = this.img.width;
    this.h = this.img.height;

    for ( let y=0; y<this.img.height; y++ )
    {
      for ( let x=0; x<this.img.width; x++ )
      {
        let col = this.img.get(x, y);//pixels[y*this.img.width+x];
        let r = int(red(col));
        let g = int(green(col));
        let b = int(blue(col));

        if ( r==255 && g==255 && b==255 )
        {
          if ( this.x1 >= y )
          {
            this.x1 = y;
          }
          if ( this.y1 >= x )
          {
            this.y1 = x;
          }
          if ( this.x2 <= y )
          {
            this.x2 = y+1;
          }
          if ( this.y2 <= x )
          {
            this.y2 = x+1;
          }
        }
      }
    }
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw()
  {
    let shift = this.mask_float;
    if ( this.on )
    {
      shift = this.mask_float/6*5;
    }
    if ( this.fit )
    {
      shift = 0;
    }

    {
      push();

      translate( this.x+BASE_MAPTIP_SIZE, this.y );
      image( this.imgRotate, 0, -BASE_MAPTIP_SIZE*2 );
      image( this.imgInv, BASE_MAPTIP_SIZE+BASE_MAPTIP_SIZE/2, -BASE_MAPTIP_SIZE*2 );

      translate( this.imgMask.width*BASE_MAPTIP_SIZE/2, this.imgMask.height*BASE_MAPTIP_SIZE/2 );
      rotate( radians( 90*(this.rotate+3) ) );
      translate( -this.imgMask.width*BASE_MAPTIP_SIZE/2, -this.imgMask.height*BASE_MAPTIP_SIZE/2 );

      if ( this.upside == 0 )
      {
        scale( BASE_MAPTIP_SIZE, BASE_MAPTIP_SIZE );
      } else
      {
        translate( this.imgMask.width*BASE_MAPTIP_SIZE/2, this.imgMask.height*BASE_MAPTIP_SIZE/2 );
        scale( -BASE_MAPTIP_SIZE, BASE_MAPTIP_SIZE );
        translate( -this.imgMask.width/2, -this.imgMask.height/2 );
      }
      tint( 255, 255, 255, 96 );
      image( this.imgMask, 0, 0 );
      pop();
    }

    {
      push();

      translate( this.x+BASE_MAPTIP_SIZE-shift, this.y-shift );

      translate( this.imgMask.width*BASE_MAPTIP_SIZE/2, this.imgMask.height*BASE_MAPTIP_SIZE/2 );
      rotate( radians( 90*(this.rotate+3) ) );
      translate( -this.imgMask.width*BASE_MAPTIP_SIZE/2, -this.imgMask.height*BASE_MAPTIP_SIZE/2 );

      if ( this.upside == 0 )
      {
        scale( BASE_MAPTIP_SIZE, BASE_MAPTIP_SIZE );
      } else
      {
        translate( this.imgMask.width*BASE_MAPTIP_SIZE/2, this.imgMask.height*BASE_MAPTIP_SIZE/2 );
        scale( -BASE_MAPTIP_SIZE, BASE_MAPTIP_SIZE );
        translate( -this.imgMask.width/2, -this.imgMask.height/2 );
      }

      tint( 255, 255, 255 );
      /*
      if(hitTest(mouseX, mouseY))
       {
       stroke( 255 );
       strokeWeight(4);
       rect( 0, 0, imgMask.width, imgMask.height );
       noStroke();
       }
       */
      image( this.imgMask, 0, 0 );
      pop();
    }
  }

  //----------------------------------------------------------------------------------------
  // hitTest
  //----------------------------------------------------------------------------------------

  hitTest( mousex, mousey )
  {
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

    mousex -= (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2;
    mousey -= (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y;
    mousex /= w;
    mousey /= h;

    if ( mousex>this.x+BASE_MAPTIP_SIZE/2 && mousey>this.y && mousex<(this.x+this.imgMask.height*BASE_MAPTIP_SIZE+BASE_MAPTIP_SIZE/2) && mousey<(this.y+this.imgMask.height*BASE_MAPTIP_SIZE )  )
    {
      return true;
    }
    return false;
  }

  //----------------------------------------------------------------------------------------
  // conv
  //----------------------------------------------------------------------------------------

  convx( mousex )
  {
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

    mousex -= (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2;
    mousex /= w;

    return mousex;
  }

  convy( mousey )
  {
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

    mousey -= (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2+GLOBAL_POS_Y;
    mousey /= h;

    return mousey;
  }

  //----------------------------------------------------------------------------------------
  // attach
  //----------------------------------------------------------------------------------------

  attach()
  {
    for ( let i=0; i<MASK_NUM; i++ )
    {
      if ( mask[i].fit )
      {
        return;
      }
    }

    if ( this.x > BASE_SCREEN_WIDTH/BASE_MAPTIP_SIZE/2-BASE_MAPTIP_SIZE &&
      this.x < BASE_SCREEN_WIDTH/BASE_MAPTIP_SIZE/2+BASE_MAPTIP_SIZE &&
      this.y > BASE_SCREEN_HEIGHT/BASE_MAPTIP_SIZE/2-BASE_MAPTIP_SIZE &&
      this.y < BASE_SCREEN_HEIGHT/BASE_MAPTIP_SIZE/2+BASE_MAPTIP_SIZE )
    {
      this.fit = true;
      this.x = (BASE_SCREEN_WIDTH)/BASE_MAPTIP_SIZE/2 - BASE_MAPTIP_SIZE/2;
      this.y = (BASE_SCREEN_HEIGHT)/BASE_MAPTIP_SIZE/2 - BASE_MAPTIP_SIZE/2;
    }
  }

  //----------------------------------------------------------------------------------------
  // action
  //----------------------------------------------------------------------------------------

  action( mousex, mousey )
  {
    mousex = this.convx( mousex );
    mousey = this.convy( mousey );

    if ( mousex>this.x && mousey>this.y-BASE_MAPTIP_SIZE*2 && mousex<this.x+BASE_MAPTIP_SIZE*2 && mousey<this.y-BASE_MAPTIP_SIZE*2+BASE_MAPTIP_SIZE ) 
    {
      this.rotate++;
      if ( this.rotate >= 5 )
      {
        this.rotate = 1;
      }
    }

    if ( mousex>this.x+BASE_MAPTIP_SIZE*2+BASE_MAPTIP_SIZE/2 && mousey>this.y-BASE_MAPTIP_SIZE*2 && mousex<this.x+BASE_MAPTIP_SIZE*2+BASE_MAPTIP_SIZE+BASE_MAPTIP_SIZE/2 && mousey<this.y-BASE_MAPTIP_SIZE*2+BASE_MAPTIP_SIZE ) 
    {
      this.upside++;
      if ( this.upside >= 2 )
      {
        this.upside = 0;
      }
    }
  }
}