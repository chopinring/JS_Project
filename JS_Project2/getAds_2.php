<?php
function getRandNum($typeNum){
    $conn=new mysqli("139.129.201.254","root","453d920235d8","jsadsnew");
    if(!$conn){
        echo 'connect failed';
        exit;
    }
    $sql="set names 'utf8'";
    $conn->query($sql);
    if($typeNum==0){
        $sqlPrio = "select distinct ads_priority from jsads_ios where ads_status=1";
    }elseif($typeNum==1){
        $sqlPrio = "select distinct ads_priority from jsads_android where ads_status=1";
    }elseif($typeNum==2){
        $sqlPrio = "select distinct ads_priority from jsads_android_wx where ads_status=1";
    }elseif($typeNum==3){
        $sqlPrio = "select distinct ads_priority from jsads_ios_wx where ads_status=1";
    }
    $prioArrRS = $conn->query($sqlPrio);
    $arrayP = array();
    $tNum = 0;
    while($tcRowl=$prioArrRS->fetch_assoc()){
        $arrayP[$tNum]=$tcRowl["ads_priority"];
        $tNum++;
    }
    $prioNumTmp=0;
    do{
        $randNum = rand(1,55);
        if($randNum==1){
            $prioNumTmp = 1;
        }elseif($randNum>1 && $randNum<4){
            $prioNumTmp = 2;
        }elseif($randNum>3 && $randNum<7){
            $prioNumTmp = 3;
        }elseif($randNum>6 && $randNum<11){
            $prioNumTmp = 4;
        }elseif($randNum>10 && $randNum<16){
            $prioNumTmp = 5;
        }elseif($randNum>15 && $randNum<22){
            $prioNumTmp = 6;
        }elseif($randNum>21 && $randNum<29){
            $prioNumTmp = 7;
        }elseif($randNum>28 && $randNum<37){
            $prioNumTmp = 8;
        }elseif($randNum>36 && $randNum<46){
            $prioNumTmp = 9;
        }elseif($randNum>45 && $randNum<56){
            $prioNumTmp = 10;
        }
    }while(!in_array($prioNumTmp,$arrayP));
    return $prioNumTmp;
}
function checkLegal($tc,$pn,$pr,$typeNum){
    $conn=new mysqli("139.129.201.254","root","453d920235d8","jsadsnew");
    if(!$conn){
        echo 'connect failed';
        exit;
    }
    $sql="set names 'utf8'";
    $conn->query($sql);
    if($typeNum==0){
        $sqlPrio = "select distinct ads_priority from jsads_ios where ads_status=1";
    }elseif($typeNum==1){
        $sqlPrio = "select distinct ads_priority from jsads_android where ads_status=1";
    }elseif($typeNum==2){
        $sqlPrio = "select distinct ads_priority from jsads_android_wx where ads_status=1";
    }elseif($typeNum==3){
        $sqlPrio = "select distinct ads_priority from jsads_ios_wx where ads_status=1";
    }
    $prioArrRS = $conn->query($sqlPrio);
    $arrayP = array();
    $tccNum = 0;
    while($tcRowl=$prioArrRS->fetch_assoc()){
        $tccNum += $tcRowl["ads_priority"];
    }
    if($tc/$pn > $pr/$tccNum){
        return true;
    }else{
        return false;
    }
}
$flagNum=$_GET['flagNum'];
$typeNum=$_GET['typeNum'];
$conn=new mysqli("139.129.201.254","root","453d920235d8","jsadsnew");
if(!$conn){
    echo 'connect failed';
    exit;
}
$sql="set names 'utf8'";
$conn->query($sql);

if($flagNum==0){
	do{
	    $prioNum = getRandNum($typeNum);
	    if($typeNum==0){
	        $prioNumCountSql = "select sum(ads_count) from jsads_ios where ads_status=1 and ads_priority=$prioNum;";
	    }elseif($typeNum==1){
	        $prioNumCountSql = "select sum(ads_count) from jsads_android where ads_status=1 and ads_priority=$prioNum;";
	    }elseif($typeNum==2){
	        $prioNumCountSql = "select sum(ads_count) from jsads_android_wx where ads_status=1 and ads_priority=$prioNum;";
	    }elseif($typeNum==3){
	        $prioNumCountSql = "select sum(ads_count) from jsads_ios_wx where ads_status=1 and ads_priority=$prioNum;";
	    }
	    if($typeNum==0){
	        $totalCountSql = "select sum(ads_count) from jsads_ios where ads_status=1;";
	    }elseif($typeNum==1){
	        $totalCountSql = "select sum(ads_count) from jsads_android where ads_status=1;";
    	}elseif($typeNum==2){
        	$totalCountSql = "select sum(ads_count) from jsads_android_wx where ads_status=1;";
    	}elseif($typeNum==3){
	        $totalCountSql = "select sum(ads_count) from jsads_ios_wx where ads_status=1;";
    	}
    	$totalCountRS = $conn->query($totalCountSql);
    	$prioNumCountRS = $conn->query($prioNumCountSql);
    	$tcRow=$totalCountRS->fetch_array();
    	$pnRow=$prioNumCountRS->fetch_array();
    	$totalCount=$tcRow[0];
    	$prioNumCount=$pnRow[0];
    	$ckFlag = checkLegal($prioNumCount,$totalCount,$prioNum,$typeNum);
	}while($ckFlag);
	if($typeNum==0){
	    $selectSql="select * from jsads_ios where ads_status=1 and ads_priority=$prioNum  order by ads_count asc limit 0,1 ;";
	}elseif($typeNum==1){
	    $selectSql="select * from jsads_android where ads_status=1 and ads_priority=$prioNum order by ads_count asc limit 0,1 ;";
	}elseif($typeNum==2){
    	$selectSql="select * from jsads_android_wx where ads_status=1 and ads_priority=$prioNum order by ads_count asc limit 0,1 ;";
	}elseif($typeNum==3){
	    $selectSql="select * from jsads_ios_wx where ads_status=1 and ads_priority=$prioNum  order by ads_count asc limit 0,1 ;";
	}
	$result=$conn->query($selectSql);
	$array = array();
	if($result){
	    $row=$result->fetch_array();
	    $adscount = $row['ads_count']+1;
	    $adsid=$row['ads_id'];
	    if($typeNum==0){
	        $countSql = "update jsads_ios set ads_count=$adscount where ads_id=$adsid";
	    }elseif($typeNum==1){
	        $countSql = "update jsads_android set ads_count=$adscount where ads_id=$adsid";
	    }elseif($typeNum==2){
	        $countSql = "update jsads_android_wx set ads_count=$adscount where ads_id=$adsid";
    	}elseif($typeNum==3){
	        $countSql = "update jsads_ios_wx set ads_count=$adscount where ads_id=$adsid";
    	}
    	$conn->query($countSql);
    	$array[0]=$row['ads_headline'];
    	$array[1]=$row['ads_picUrl'];
    	$array[2]=$row['ads_url'];
    	$array[3]=$row['ads_description'];
	    $array[4]=$row['ads_id'];
    	$adsIdInput = $row['ads_id'];
    	$currentDate = date("Y-m-d");
   	 	$pvcountSql = "update jsads_pv set jsads_pv.pv_count=jsads_pv.pv_count+1 where pv_date='$currentDate' and ads_id=$adsIdInput and ads_type=$typeNum";
    	$conn->query($pvcountSql);
	}else{
    	echo 'empty res!';
	    echo 'get result failed !';
	    exit;
	}
	$jsadsHandler = array('headline'=>$array[0],'picUrl'=>$array[1],'url'=>$array[2],'desc'=>$array[3],'adsId'=>$array[4]);
	$jsadsHandler = json_encode($jsadsHandler);
	$jsadsHandler = "jsadsHandler(".$jsadsHandler .");";
	print_r($jsadsHandler);
}elseif($flagNum==1){
    $adsIdNum = $_GET['adsIdNum'];
    $currentDate = date("Y-m-d");
	$pvcountSql = "update jsads_button_pv set jsads_button_pv.bpv_count=jsads_button_pv.bpv_count+1 where bpv_date='$currentDate' and ads_id=$adsIdNum and ads_type=$typeNum";
  	print_r($pvcountSql);
    $conn->query($pvcountSql);
}


?>