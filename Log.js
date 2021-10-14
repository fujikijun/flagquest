//------------------------------------------------------------------------------------------
//
//          Log
//
//------------------------------------------------------------------------------------------

class Data
{
  constructor()
  {
    this.m_iTime = 0;
    this.m_iEventIndex = 0;
    this.m_iPlayerX = 0;
    this.m_iPlayerY = 0;
    this.m_iUseMaskTime = 0;
    this.m_iMaskDirection = 0;
    this.m_iMaskUpside = 0;
    this.m_iGetFlagNum = 0;
    this.m_iUseMaskCount = 0;
    this.m_iWarpCount = 0;
  }
}

class Log
{      
  //----------------------------------------------------------------------------------------
  // Log
  //----------------------------------------------------------------------------------------

  constructor()
  {
    this.m_strFileName = "/log/";
    this.m_iStartTime = 0;
    this.m_iTotalPlayCount = 0; // Global
    this.m_iPlayTime = 0;
    this.m_iGetFlagNum = 0;
    this.m_iUseMaskCount = 0;
    this.m_iWarpCount = 0;
    this.m_iUseMaskTime = 0;

    this.strLogHeader = "";
    this.strLogTotal = "";
    this.strLogBody = "";

    this.newfile = false;
  }

  //----------------------------------------------------------------------------------------
  // Restart
  //----------------------------------------------------------------------------------------

  Restart()
  {
    this.m_iTotalPlayCount++;
    this.m_strFileName = "/log/";
    this.m_iStartTime = 0;
    this.m_iPlayTime = 0;
    this.m_iGetFlagNum = 0;
    this.m_iUseMaskCount = 0;
    this.m_iWarpCount = 0;
    this.m_iUseMaskTime = 0;

    this.m_strFileName = "/log/" + year() + month() + day() + "_"+ nf(hour(), 2) + "_" + nf(minute(), 2) + "_" + nf(second(), 2);
    this.m_iStartTime = millis();
    let strTime = "" + year() + "/" + month() + "/" + day() + " "+ nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2);

    this.strLogHeader += "スタートが押された時刻,"; 
    this.strLogHeader += strTime; 
    this.strLogHeader += "\n"; 
    this.strLogHeader += "利用マップ,"; 
    this.strLogHeader += GLOBAL_MAP_FILENAME; 
    this.strLogHeader += "\n"; 
    this.strLogHeader += "累積プレイ回数,"; 
    this.strLogHeader += (this.m_iTotalPlayCount); 
    this.strLogHeader += "\n"; 

    if ( !this.newfile )
    {
      this.newfile = true;
      this.strLogTotal += "利用マップ,"; 
      this.strLogTotal += "累積プレイ回数,"; 
      this.strLogTotal += "スタートが押された時刻,"; 
      this.strLogTotal += "プレイ所要時間,"; 
      this.strLogTotal += "フラッグ取得数,"; 
      this.strLogTotal += "マスクプレートを取り付けた回数,"; 
      this.strLogTotal += "総ワープ回数,"; 
      this.strLogTotal += "マスクプレートを取り付けていた総時間,"; 
      this.strLogTotal += "初めてマスクプレートを取り付けた時刻,"; 
      /*
      this.strLogTotal += "フラッグ取得時刻,"; 
      this.strLogTotal += "フラッグ取得時のマスクプレート利用回数,"; 
      this.strLogTotal += "フラッグ取得時までの時間,"; 
      this.strLogTotal += "フラッグ取得時までの総移動距離,"; 
      this.strLogTotal += "フラッグ取得時までのワープ回数";
      */
    }

    {
      this.strLogTotal += "\n"; 
      this.strLogTotal += GLOBAL_MAP_FILENAME; 
      this.strLogTotal += ","; 
      this.strLogTotal += (this.m_iTotalPlayCount); 
      this.strLogTotal += ","; 
      this.strLogTotal += strTime; 
      this.strLogTotal += ",";
    }

    {
      this.strLogBody += "イベント発生時刻（Game開始からの時間）,";
      this.strLogBody += "イベントの種類（１：プレイヤー位置移動/２：ワープ生起/3:マスクプレートの取り付け/4：マスクプレートの取り外し/5：フラッグの取得/6：ゴール）,";
      this.strLogBody += "プレイヤーのX位置（世界座標）,";
      this.strLogBody += "プレイヤーのY位置（世界座標）,";
      this.strLogBody += "マスクプレートの（一回当たりの）利用時間,";
      this.strLogBody += "マスクプレートの向き(0-4),";
      this.strLogBody += "マスクプレートの種類,";
      this.strLogBody += "マスクプレートの表裏,";
      this.strLogBody += "フラッグ取得数,";
      this.strLogBody += "マスクプレート使用回数,";
      this.strLogBody += "ワープ回数";
      this.strLogBody +=  "\n";
    }
  }

  //----------------------------------------------------------------------------------------
  // Write
  //----------------------------------------------------------------------------------------

  WriteEvent( iEventIndex )
  {
    if ( iEventIndex == 5 )
    {
      g_map.vecGoal[ g_player.flag-1 ].get_time = millis() - this.m_iStartTime;
      if ( g_player.flag == 1 )
      {
        g_map.vecGoal[ g_player.flag-1 ].use_mask_num = g_player.log_iUseMaskCount;
        g_map.vecGoal[ g_player.flag-1 ].get_count = g_map.vecGoal[ g_player.flag-1 ].get_time;
        g_map.vecGoal[ g_player.flag-1 ].move_num = g_player.move_length;
        g_map.vecGoal[ g_player.flag-1 ].warp_num = g_player.log_iWarpCount;
      } else
      {
        g_map.vecGoal[ g_player.flag-1 ].use_mask_num = g_player.log_iUseMaskCount - g_map.vecGoal[ g_player.flag-2 ].use_mask_num;
        g_map.vecGoal[ g_player.flag-1 ].get_count = g_map.vecGoal[ g_player.flag-1 ].get_time - g_map.vecGoal[ g_player.flag-2 ].get_time;
        g_map.vecGoal[ g_player.flag-1 ].warp_num = g_player.log_iWarpCount - g_map.vecGoal[ g_player.flag-2 ].warp_num;
      }
    }
    {
      this.strLogBody += ( millis() - this.m_iStartTime ); 
      this.strLogBody += ","; 
      this.strLogBody += ( iEventIndex ); 
      this.strLogBody += ","; 
      this.strLogBody += ( g_player.x ); 
      this.strLogBody += ","; 
      this.strLogBody += ( g_player.y ); 
      this.strLogBody += ",";

      if ( iEventIndex == 4 )
      {
        this.strLogBody += ( millis() - this.m_iStartTime ); 
        this.strLogBody += ",";
      } else
      {
        this.strLogBody += ( 0 ); 
        this.strLogBody += ",";
      } 

      this.strLogBody += ( FILED_STATE ); 
      this.strLogBody += ",";
      this.strLogBody += ( CURRENT_MASK ); 
      this.strLogBody += ",";
      this.strLogBody += ( CURRENT_MASK_UPSIDE ); 
      this.strLogBody += ",";
      this.strLogBody += ( g_player.flag ); 
      this.strLogBody += ",";
      this.strLogBody += ( g_player.log_iUseMaskCount ); 
      this.strLogBody += ",";      
      this.strLogBody += ( g_player.log_iWarpCount ); 
      this.strLogBody += "\n";
    }
  }

  WriteFish()
  {
    let t = millis() - this.m_iStartTime;
    {
      this.strLogHeader += "プレイ所要時間,"; 
      this.strLogHeader += ( t ); 
      this.strLogHeader += "\n"; 
      this.strLogHeader += "フラッグ取得数,"; 
      this.strLogHeader += ( g_player.flag ); 
      this.strLogHeader += "\n"; 
      this.strLogHeader += "マスクプレートを取り付けた回数,"; 
      this.strLogHeader += ( g_player.log_iUseMaskCount ); 
      this.strLogHeader += "\n";       
      this.strLogHeader += "総ワープ回数,"; 
      this.strLogHeader += ( g_player.log_iWarpCount ); 
      this.strLogHeader += "\n";   
      this.strLogHeader += "マスクプレートを取り付けていた総時間,"; 
      this.strLogHeader += ( g_player.log_iUseMaskTotalTime ); 
      this.strLogHeader += "\n";
    }

    {
      this.strLogTotal += ( t ); 
      this.strLogTotal += ","; 
      this.strLogTotal += ( g_player.flag ); 
      this.strLogTotal += ","; 
      this.strLogTotal += ( g_player.log_iUseMaskCount ); 
      this.strLogTotal += ",";       
      this.strLogTotal += ( g_player.log_iWarpCount ); 
      this.strLogTotal += ",";   
      this.strLogTotal += ( g_player.log_iUseMaskTotalTime ); 
      this.strLogTotal += ",";  
      this.strLogTotal += ",";   
      this.strLogTotal += ( g_player.log_iUseMaskFirstTime ); 
      this.strLogTotal += ",";  
      this.strLogTotal += ","; 

      for ( let i=0; i<g_map.vecGoal.length; i++ )
      {
        if ( !g_map.vecGoal[i].on )
        {
          this.strLogTotal += "N/A";
          this.strLogTotal += ",";
          this.strLogTotal += "N/A";
          this.strLogTotal += ",";
          this.strLogTotal += "N/A";
          this.strLogTotal += ",";
          this.strLogTotal += "N/A";
          this.strLogTotal += ",";
          this.strLogTotal += "N/A";
          this.strLogTotal += ",";
          this.strLogTotal += ",";
        } else
        {
          this.strLogTotal += ( g_map.vecGoal[i].get_time );
          this.strLogTotal += ",";
          this.strLogTotal += ( g_map.vecGoal[i].use_mask_num );
          this.strLogTotal += ",";
          this.strLogTotal += ( g_map.vecGoal[i].get_count );
          this.strLogTotal += ",";
          this.strLogTotal += ( g_map.vecGoal[i].move_num );
          this.strLogTotal += ",";
          this.strLogTotal += ( g_map.vecGoal[i].warp_num );
          this.strLogTotal += ",";
          this.strLogTotal += ",";
        }
      }

      this.strLogTotal += "\n" ;
    }

    this.output();

    this.strLogHeader = "";
    //this.strLogTotal = "";
    this.strLogBody = "";
  }

  output()
  {
    let zip = new JSZip();
    zip.file( "header.csv", this.strLogHeader );
    zip.file( "total.csv", this.strLogTotal );
    zip.file( "body.csv", this.strLogBody );

    zip.generateAsync( {
    type:
      "blob"
    }
    )
    .then(function(content) {
      saveAs(content, "log.zip");
    }
    );
  }
}