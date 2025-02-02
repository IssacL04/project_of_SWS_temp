import { update_rotation, query_pointer_position, update_text, create_text, gameobjects_overlap, update_scale, create_sprite, create_rectangle, query_position, update_position, update_loop, build_game, input_key_down } from "arcade_2d";

// Create GameObjects outside update_loop(...)


const SWORDS_APPEAR_LENGTH = 1000000;
let player1_alive = true;
let player2_alive = true;
const origin_HP = 100;
const origin_HP2 = 100;
const defense_origin_HP = 10;


const punched_dis = 30;
const waved_dis = 50;

const PUNCHED_DEHP = 5;
const WAVED_DEHP = 10;
const JUMP_HEIGHT = -30;
const BARRI_BOUNCE_DIS = 30;
const BOUNDRY_MIN = 0;
const BOUNDRY_MAX = 550;
const birth_place = [200, 400];
const birth_place2 = [400, 300];
const g = 5;
const inf = 999999; 
const movement_dist = 10;
const size_of_player = [0.15, 0.25];
const RIGHT = 1;
const LEFT = 0;
const UP = 2;
const DOWN = 3;
const background = update_position(create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181910_com.huawei.hinote.png"), [300, 300]);
const sword = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_new.jpg"), [0.2, 0.2]);
const swords = [sword];
const swords_appeartime = [];
const is_sword_appear = [];
const player = [update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/run1r.png"),  size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/run2r.png"), size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/run1l.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/run2l.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/Attack2r.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/Attack2l.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/Attack3r.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/IssacL04/project_of_SWS_temp/main/Attack3l.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_right.jpg"), size_of_player )
                ];

const player2 = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181659_com.huawei.hinote.png"),  size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/7a9ae57ae73cdebd3c49bfe1e5f9232731e0f3a5/player_towars_right2.png"), size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_195411.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/62abc972249c331bca6e0e98382e6aa0f3a2c67c/player_towars_left2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_right.jpg"), size_of_player )                
                ];

                
const player_towards_right = 0;
const player_towards_right2 = 1;
const player_towards_left  = 2;
const player_towards_left2  = 3;
const punch_right = 4;
const punch_left = 5;
const punch2_right = 6;
const punch2_left = 7;
const attacked_left = 8;
const attacked_right = 9;
const sword_right = 10;
const sword_left = 11;
const wave_right = 12;
const wave_left = 13;
const defense_left = 14;
const defense_right = 15;
const punchRight = [punch_right,punch2_right];
const punchLeft = [punch_left,punch2_left];
let punchRightFrameIndex = 0;
let punchLeftFrameIndex = 0;

const barri = [create_rectangle(200, 50), create_rectangle(200, 50)];
const barri_size = [[200, 50], [200, 50]];
const player_size = [[35, 70], [35, 70]];
const boundry = [create_rectangle(20, 1200), create_rectangle(20, 1200), 
                create_rectangle(1200, 20), create_rectangle(1200, 20)];

update_position(player[player_towards_left] , [-inf, -inf]);
update_position(player[player_towards_left2], [-inf, -inf]);
update_position(player[player_towards_right], [-inf, -inf]);
update_position(player[player_towards_right2], [-inf, -inf]);

update_position(player2[player_towards_left] , [-inf, -inf]);
update_position(player2[player_towards_left2], [-inf, -inf]);
update_position(player2[player_towards_right], [-inf, -inf]);
update_position(player2[player_towards_right2], [-inf, -inf]);

update_position(barri[0], [100, 300]);
update_position(barri[1], [500, 430]);

update_position(boundry[LEFT], [0, 0]);
update_position(boundry[UP], [0, 0]);
update_position(boundry[RIGHT], [600, 0]);
update_position(boundry[DOWN], [0, 600]);



function make_anim(mov, pos){
    return update_position(mov, pos);
}

function add_vectors(to, from) {
   to[0] = to[0] + from[0];
   to[1] = to[1] + from[1];
}

function check_barri(player, barri){
    for(let i = 0; i < array_length(barri); i = i + 1){
        if( gameobjects_overlap(barri[i], player) ){
            return true;
        }
    }
    return false;
}

function is_towards_right(cond){
    if(cond === player_towards_right2 || cond === player_towards_right
        || cond === punch_right || cond === punch2_right
        || cond === wave_right ||  cond === sword_right
        || cond === attacked_right || cond === defense_right){
            return true;
        }
    else {
        return false;
    }
}

function is_borderline(barri, posi, p_index){
    for(let i = 0; i < array_length(barri); i = i + 1){
        const x = query_position(barri[i])[0];
        const y = query_position(barri[i])[1];
        if(posi[0] >= x - (barri_size[i][0] + player_size[p_index][0] )/ 2 
            && posi[0] <= x + (barri_size[i][0] + player_size[p_index][0] )/ 2 
            && math_abs(posi[1] - (y - (barri_size[i][1] + player_size[p_index][1]) / 2)) <= g){
                return true;
            }
    }
    return false;
}
function is_beside_right(barri, posi, p_index){
    for(let i = 0; i < array_length(barri); i = i + 1){
        const x = query_position(barri[i])[0];
        const y = query_position(barri[i])[1];
        if(posi[1] >= y - (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[1] <= y + (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[0] <= x + (barri_size[i][0] + player_size[p_index][0]) / 2){
                return true;
            }
    }
    return false;
}

function is_beside_left(barri, posi, p_index){
    for(let i = 0; i < array_length(barri); i = i + 1){
        const x = query_position(barri[i])[0];
        const y = query_position(barri[i])[1];
        if(posi[1] >= y - (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[1] <= y + (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[0] >= x - (barri_size[i][0] + player_size[p_index][0]) / 2){
                return true;
            }
    }
    return false;
}
let cond = player_towards_right;
let cond2 = player_towards_left;
let dir = RIGHT;
let dir2 = LEFT;
let last_dir = -1;
let last_dir2 = -1;
let hp1 = origin_HP;
let hp2 = origin_HP2;
let defense_hp1 = defense_origin_HP;
let defense_hp2 = defense_origin_HP;

make_anim(player[cond], birth_place);
make_anim(player2[cond2], birth_place2);

update_position(swords[0], [50, 100]);
swords_appeartime[0] = get_time();
is_sword_appear[0] = true;
const with_sword = [false, false];



const find_xy = create_text(stringify(query_position(player[cond])[0]) + "," + stringify(query_position(player[cond])[1]));
const find_xy2 = create_text(stringify(query_position(player2[cond2])[0]) + "," + stringify(query_position(player2[cond2])[1]));

const print_hp = create_text("player1 origin_HP : " + stringify(origin_HP));
const print_hp2 = create_text("player2 origin_HP : " + stringify(origin_HP2));

const print_point = create_text("0 , 0");
const game_text = create_text("2P game");
const rule_text = create_text("keys: p1:q w t y / p2:[ ] 1 2");

update_position(game_text, [240, 25]);
update_position(print_point, [250, 50]);
update_position(rule_text, [420, 25]);



update_loop(game_state => {
    //-----------------------------player1--------------------------------------
    
    
    //-----------------------------trial----------------------------------------
    //update_text(game_text, stringify(get_time()));
    
    
    
    
    //--------------------------------------------------------------------------
    
    //-----------------------------defense recover------------------------------
    if(cond !== defense_right && cond !== defense_left && defense_hp1 < defense_origin_HP){
        defense_hp1 = defense_hp1 + 1;
    }
    
    //--------------------------------------------------------------------------
    
    
    //-----------------------------swords---------------------------------------
    
    
    const present_time = get_time();
    for(let i = 0; i < array_length(swords_appeartime); i = i + 1){
        //swords dispear check
        if(!is_sword_appear[i]){
            continue;
        }
        if(present_time - swords_appeartime[i] > SWORDS_APPEAR_LENGTH){
            update_position(swords[i], [inf, inf]);
            is_sword_appear[i] = false;
            continue;
        }
        update_rotation(swords[i], (get_time() % 2 === 1) ? math_PI / 40 : -1 * math_PI / 40);
        //boundry check
        const sword_posi_x = query_position(swords[i])[0];
        const sword_posi_y = query_position(swords[i])[1];
        
        if( gameobjects_overlap(boundry[LEFT], swords[i])){
            update_position(swords[i], [sword_posi_x + 10 * movement_dist, sword_posi_y]);
        }
        else if( gameobjects_overlap(boundry[RIGHT], swords[i])){
            update_position(swords[i], [sword_posi_x - 10 * movement_dist, sword_posi_y]);
        }
        else if( gameobjects_overlap(boundry[UP], swords[i])){
            update_position(swords[i], [sword_posi_x, sword_posi_y + 10 * movement_dist]);
        }
        else if( gameobjects_overlap(boundry[DOWN], swords[i])){
            update_position(swords[i], [sword_posi_x, sword_posi_y - 10 * movement_dist]);
        }
        //gravity
        if(! is_borderline(barri, query_position(swords[i]), 0)){
            if(query_position(swords[i])[0] > 0 && query_position(swords[i])[0] < 550 
            && query_position(swords[i])[1] > 0 && query_position(swords[i])[1] < 550){
                update_position(swords[i], [query_position(swords[i])[0], query_position(swords[i])[1] + g]);
            }
        }
    }
    //
    
    
    //--------------------------------------------------------------------------
    
    
    
    //----------------------pick up sword check---------------------------------
    
    for(let i = 0; i < array_length(swords); i = i + 1){
        if(gameobjects_overlap(swords[i], player[cond])){
            update_position(swords[i], [inf, inf]);
            is_sword_appear[i] = false;
            if(!is_towards_right(cond)){
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                update_position(player[cond], [-inf, -inf]);
                cond = sword_left;
                update_position(player[cond], [x, y]);
                with_sword[0] = true;
            }
            else if(is_towards_right(cond)){
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                update_position(player[cond], [-inf, -inf]);
                cond = sword_right;
                update_position(player[cond], [x, y]);
                with_sword[0] = true;
            }
            break;
        }
    }
    
    //--------------------------------------------------------------------------
    
    
    
    
    //-------------after being attacked, no need to be updated------------------
    
    if(cond === attacked_left){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        cond = player_towards_left;
        update_position(player[cond], [x, y]);
    }
    if(cond === attacked_right){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        cond = player_towards_right;
        update_position(player[cond], [x, y]);
    }
    //--------------------------------------------------------------------------
    
    
    
    
    //--------being attacked, need to be updated every time we change-----------
    
    if(gameobjects_overlap(player[cond], player2[cond2])){
        if((cond2 === punch2_left || cond2 === punch_left)
        && query_position(player[cond])[0] < query_position(player2[cond2])[0]
        && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
        ){
            const x = query_position(player[cond])[0] - punched_dis;
            const y = query_position(player[cond])[1];
            if(cond === defense_right){
                if(defense_hp1 - PUNCHED_DEHP >= 0){
                    defense_hp1 = defense_hp1 - PUNCHED_DEHP;
                }
                else {
                    hp1 = hp1 + defense_hp1 - PUNCHED_DEHP;
                    defense_hp1 = 0;
                }
            }
           else {
               hp1 = hp1 - PUNCHED_DEHP;
           }
            update_position(player[cond], [-inf, -inf]);
            cond = attacked_right;
            update_position(player[cond], [x, y]);
        }    
        else if((cond2 === punch2_right || cond2 === punch_right)
            && query_position(player[cond])[0] > query_position(player2[cond2])[0]
            && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
            ){
                const x = query_position(player[cond])[0] - punched_dis;
                const y = query_position(player[cond])[1];
                if(cond === defense_left){
                    if(defense_hp1 - PUNCHED_DEHP >= 0){
                        defense_hp1 = defense_hp1 - PUNCHED_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - PUNCHED_DEHP;
                        defense_hp1 = 0;
                    }
                }
                else {
                    hp1 = hp1 - PUNCHED_DEHP;
                }
                update_position(player[cond], [-inf, -inf]);
                cond = attacked_right;
                update_position(player[cond], [x, y]);
        }
        else if( (cond2 === wave_left )
            && query_position(player[cond])[0] < query_position(player2[cond2])[0]
            && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
            ){
                const x = query_position(player[cond])[0] - waved_dis;
                const y = query_position(player[cond])[1];
                if(cond === defense_right){
                    if(defense_hp1 - WAVED_DEHP >= 0){
                        defense_hp1 = defense_hp1 - WAVED_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - WAVED_DEHP;
                        defense_hp1 = 0;
                    }
                }
                else {
                    hp1 = hp1 - WAVED_DEHP;
                }
                update_position(player[cond], [-inf, -inf]);
                cond = attacked_right;
                update_position(player[cond], [x, y]);
        }
        else if((cond2 === wave_right)
            && query_position(player[cond])[0] > query_position(player2[cond2])[0]
            && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
            ){
                const x = query_position(player[cond])[0] - waved_dis;
                const y = query_position(player[cond])[1];
                if(cond === defense_left){
                    if(defense_hp1 - WAVED_DEHP >= 0){
                        defense_hp1 = defense_hp1 - WAVED_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - WAVED_DEHP;
                        defense_hp1 = 0;
                    }
                }
                else {
                    hp1 = hp1 - WAVED_DEHP;
                }
                update_position(player[cond], [-inf, -inf]);
                cond = attacked_right;
                update_position(player[cond], [x, y]);
        }
    }
    
    //--------------------------------------------------------------------------
    
    //---------------------------after defense----------------------------------
    
    if(cond === defense_left){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        if(with_sword[0]){
            cond = sword_left;
        }
        else {
            cond = player_towards_left;
        }
        update_position(player[cond], [x, y]);
    }
    if(cond === defense_right){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        if(with_sword[0]){
            cond = sword_right;
        }
        else {
            cond = player_towards_right;
        }
        update_position(player[cond], [x, y]);
    }
    
    //--------------------------------------------------------------------------
    
    const new_position = query_position(player[cond]);
    const pre_position = query_position(player[cond]);
    const posi = query_position(player[cond]);
    
    const point_xy = query_pointer_position();
    
    let temp = player;//seems useless
    
    //---------------------judge the end of one game----------------------------
    
    if ( !player1_alive) {
       update_text(game_text, "Player2 Win !");
       return undefined;
    }
    if( !player2_alive){
        update_text(game_text, "Player1 Win !");
        return undefined;
    }
    
    //--------------------------------------------------------------------------
    
    
    
    
    //----------------------------after punch-----------------------------------
    if(cond === punch_right){
        punchRightFrameIndex = (punchRightFrameIndex + 1) % 2;
        cond = punchRight[punchRightFrameIndex];
        update_position(player[cond], pre_position);
        update_position(player[cond], [-inf, -inf]);
        punchRightFrameIndex = (punchRightFrameIndex + 1) % 2;
        cond = punchRight[punchRightFrameIndex];
        update_position(player[cond], pre_position);

    }

    if(cond === punch_left){
        punchLeftFrameIndex = (punchLeftFrameIndex + 1) % 2;
        cond = punchLeft[punchLeftFrameIndex];
        update_position(player[cond], pre_position);
        update_position(player[cond], [-inf, -inf]);
        punchLeftFrameIndex = (punchLeftFrameIndex + 1) % 2;
        cond = punchLeft[punchLeftFrameIndex];
        update_position(player[cond], pre_position);
    }
    
    //--------------------------------------------------------------------------
    
    //--------------------------after wave--------------------------------------
    if(with_sword[0]){
        if(cond === wave_right){
            update_position(player[cond], [-inf, -inf]);
            cond = sword_right;
            update_position(player[cond], pre_position);
        }
        if(cond === wave_left){
            update_position(player[cond], [-inf, -inf]);
            cond = sword_left;
            update_position(player[cond], pre_position);
        }
    }
    //--------------------------------------------------------------------------
    
    
    
    
    //--------------------------updadte text------------------------------------
    
    update_text(find_xy, "player1 at: " + stringify(posi[0]) + "," + stringify(posi[1]));
    update_position(find_xy, [110, 100]);
    
    update_text(print_hp, "HP of player1 : " + stringify(hp1));
    update_position(print_hp, [400, 100]);
    
    update_text(print_point, "position of pointer : " + stringify(point_xy[0]) + "," + stringify(point_xy[1]));
    
    //--------------------------------------------------------------------------
    
    
    
    //--------------------------boudry check------------------------------------
    
    if( gameobjects_overlap(boundry[LEFT], player[cond])){
        update_position(player[cond], [new_position[0] + 10 * movement_dist, new_position[1]]);
    }
    else if( gameobjects_overlap(boundry[RIGHT], player[cond])){
        update_position(player[cond], [new_position[0] - 10 * movement_dist, new_position[1]]);
    }
    else if( gameobjects_overlap(boundry[UP], player[cond])){
        update_position(player[cond], [new_position[0], new_position[1] + 10 * movement_dist]);
    }
    else if( gameobjects_overlap(boundry[DOWN], player[cond])){
        update_position(player[cond], [new_position[0], new_position[1] - 10 * movement_dist]);
    }
    
    //--------------------------------------------------------------------------
    
    
    //--------------------------barrier check-----------------------------------
    /*
    if( check_barri(player[cond], barri) ){
        if( last_dir === UP ){
            update_position(player[cond], [new_position[0], new_position[1] + BARRI_BOUNCE_DIS]);
        }
        else if(last_dir === DOWN ){
            update_position(player[cond], [new_position[0], new_position[1] - BARRI_BOUNCE_DIS]);
        }
        else if(last_dir === LEFT ){
            update_position(player[cond], [new_position[0] + BARRI_BOUNCE_DIS, new_position[1]]);
        }
        else if(last_dir === RIGHT ){
            update_position(player[cond], [new_position[0] - BARRI_BOUNCE_DIS, new_position[1]]);
        }
    }
    */
    //--------------------------------------------------------------------------
    
    
    //-------------------drag back those who are out of rage--------------------
    
    if(posi[0] < BOUNDRY_MIN ) {
        update_position(player[cond], [BOUNDRY_MIN + 35, posi[1]]);
    }
    if(posi[0] > BOUNDRY_MAX){
        update_position(player[cond], [BOUNDRY_MAX - 1  , posi[1]]);
    }
    if(posi[1] < BOUNDRY_MIN){
        update_position(player[cond], [posi[0], BOUNDRY_MIN + 35]);
    }
    if(posi[1] > BOUNDRY_MAX){
        update_position(player[cond], [posi[0], BOUNDRY_MAX - 1 ]);
    }

    //--------------------------------------------------------------------------
    
    
    
    
    //-----------------------------jump-----------------------------------------
   
   if (input_key_down("t") ) {
       if( check_barri(player[cond], barri) &&(!is_borderline(barri, query_position(player[cond]), 0))){
            add_vectors(new_position, [0, BARRI_BOUNCE_DIS]);
            update_position(player[cond], new_position);
       }
       add_vectors(new_position, [0, JUMP_HEIGHT]);
       update_position(player[cond], new_position);
       
       last_dir = UP;
   }
   
   //---------------------------------------------------------------------------
   
   
   //-----------------------------move left-------------------------------------
   
   else if (input_key_down("q") && cond !== defense_right && cond !== defense_left) {
        if(check_barri(player[cond], barri)){
            if(is_beside_right(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                update_position(player[cond], new_position);
            }
       }
       else {
           update_position(player[cond], [-inf, -inf]);
           if(with_sword[0]){
               if(cond === sword_left ){
                    cond = player_towards_left;
                }
                else {
                    cond = sword_left;
                }
           }
            else {
                if(cond === player_towards_left ){
                    cond = player_towards_left2;
                }
                else {
                    cond = player_towards_left;
                }
            }
            update_position(player[cond], new_position);
            add_vectors(new_position, [-1 * movement_dist, 0]);
            update_position(player[cond], new_position);
       }
        last_dir = LEFT;
   }
   
   //---------------------------------------------------------------------------
   
   
   //--------------------------------move right---------------------------------
   
   else if (input_key_down("w") && cond !== defense_right && cond !== defense_left) {
       if(check_barri(player[cond], barri)){
            if(is_beside_left(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                add_vectors(new_position, [-BARRI_BOUNCE_DIS, 0]);
                update_position(player[cond], new_position);
            }
       }
       else{
            update_position(player[cond], [-inf, -inf]);
            if(with_sword[0]){
               if(cond === sword_right ){
                    cond = player_towards_right;
                }
                else {
                    cond = sword_right;
                }
           }
            else {
                if(cond === player_towards_right ){
                    cond = player_towards_right2;
                }
                else {
                    cond = player_towards_right;
                }
            }
            update_position(player[cond], pre_position);
            add_vectors(new_position, [movement_dist, 0]);
            update_position(player[cond], new_position);
       }
       
       last_dir = RIGHT;
       
   }
   
   //---------------------------------------------------------------------------
   
   //-----------------------------to punch--------------------------------------
   
   else if(input_key_down("y") && cond !== defense_right && cond !== defense_left){
       if(is_towards_right(cond)){
           //cond = punch_right;
           if(check_barri(player[cond], barri)){
            if(is_beside_left(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                add_vectors(new_position, [-BARRI_BOUNCE_DIS, 0]);
                update_position(player[cond], new_position);
            }
       }
            else{
                update_position(player[cond], [-inf, -inf]);
                if(with_sword[0]){
                    if(cond === wave_right){
                        cond = sword_right;
                    }
                    else {
                        cond = wave_right;
                    }
                }
                else {
                    if(cond === punch_right){
                        cond = punch2_right;
                    }
                    else {
                        cond = punch_right;
                    }
                }
                
                update_position(player[cond], pre_position);
            /*    add_vectors(new_position, [movement_dist, 0]);
                update_position(player[cond], new_position);
            */
            }
            last_dir = RIGHT;
       
       }
       else {
            if(check_barri(player[cond], barri)){
                if(is_beside_right(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                    add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else {
                update_position(player[cond], [-inf, -inf]);
                if(with_sword[0]){
                    if(cond === wave_left){
                        cond = sword_left;
                    }
                    else {
                        cond = wave_left;
                    }
                }
                else {
                    if(cond === punch_left){
                        cond = punch2_left;
                    }
                    else {
                        cond = punch_left;
                    }
                }
                update_position(player[cond], new_position);
            /*    add_vectors(new_position, [-1 * movement_dist, 0]);
                update_position(player[cond], new_position);
            */
            }
            last_dir = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   
   //---------------------------------------------------------------------------
   
   //-----------------------------to defense------------------------------------
   
   else if(defense_hp1 > 0 && input_key_down("e")){
       if(is_towards_right(cond)){
           //cond = punch_right;
            if(check_barri(player[cond], barri)){
                if(is_beside_left(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                    add_vectors(new_position, [-BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else{
                update_position(player[cond], [-inf, -inf]);
                cond = defense_right;
                update_position(player[cond], pre_position);
                add_vectors(new_position, [0, 0]);
                update_position(player[cond], new_position);
            }
            last_dir = RIGHT;
       
       }
       else {
           //cond = punch_left;
            if(check_barri(player[cond], barri)){
                if(is_beside_right(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                    add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else {
                update_position(player[cond], [-inf, -inf]);
                cond = defense_left;
                update_position(player[cond], new_position);
                add_vectors(new_position, [0, 0]);
                update_position(player[cond], new_position);
            }
            last_dir = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   
   
   //---------------------------------------------------------------------------
   
   //------------------------------gravity--------------------------------------
   if(! is_borderline(barri, query_position(player[cond]), 0)){
       if(query_position(player[cond])[0] > 0 && query_position(player[cond])[0] < 550 
        && query_position(player[cond])[1] > 0 && query_position(player[cond])[1] < 550){
            update_position(player[cond], [query_position(player[cond])[0], query_position(player[cond])[1] + g]);
        }
        last_dir = DOWN;
   }
   
    
    //--------------------------------------------------------------------------
    
    //HP check
    if(hp1 <= 0){
        player1_alive = false;
    }
    
    
    //-----------------------------Player2--------------------------------------
    if(cond2 === attacked_left){
        const x = query_position(player2[cond2])[0];
        const y = query_position(player2[cond2])[1];
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_left;
        update_position(player2[cond2], [x, y]);
    }
    if(cond2 === attacked_right){
        const x = query_position(player2[cond2])[0];
        const y = query_position(player2[cond2])[1];
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_right;
        update_position(player2[cond2], [x, y]);
    }
    
    
    if(gameobjects_overlap(player[cond], player2[cond2])){
        if((cond === punch2_left || cond === punch_left)
            && query_position(player2[cond2])[0] < query_position(player[cond])[0]
            && math_abs( query_position(player2[cond2])[1] - query_position(player[cond])[1] ) < 30
        ){
            const x = query_position(player2[cond2])[0] - punched_dis;
            const y = query_position(player2[cond2])[1];
            if(cond2 !== punch_right && cond2 !== punch2_right && cond2 !== defense_right){
                hp2 = hp2 - PUNCHED_DEHP;
            }
            update_position(player2[cond2], [-inf, -inf]);
            cond2 = attacked_right;
            update_position(player2[cond2], [x, y]);
        }    
        else if((cond === punch2_right || cond === punch_right)
            && query_position(player2[cond2])[0] > query_position(player[cond])[0]
            && math_abs(query_position(player2[cond2])[1] - query_position(player[cond])[1]) < 30
            ){
                const x = query_position(player2[cond2])[0] - punched_dis;
                const y = query_position(player2[cond2])[1];
                if(cond2 !== punch_left && cond2 !== punch2_left && cond2 !== defense_left){
                    hp2 = hp2 - PUNCHED_DEHP;
                }
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = attacked_right;
                update_position(player2[cond2], [x, y]);
        }
        else if( (cond === wave_left )
            && query_position(player2[cond2])[0] < query_position(player[cond])[0]
            && math_abs(query_position(player2[cond2])[1] - query_position(player[cond])[1]) < 30
            ){
                const x = query_position(player2[cond2])[0] - waved_dis;
                const y = query_position(player2[cond2])[1];
                if(cond2 !== wave_right && cond2 !== defense_right){
                    hp2 = hp2 - WAVED_DEHP;
                }
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = attacked_right;
                update_position(player2[cond2], [x, y]);
        }
        else if((cond === wave_right)
            && query_position(player2[cond2])[0] > query_position(player[cond])[0]
            && math_abs(query_position(player2[cond2])[1] - query_position(player[cond])[1]) < 30
            ){
                const x = query_position(player2[cond2])[0] - waved_dis;
                const y = query_position(player2[cond2])[1];
                if(cond2 !== wave_left && cond2 !== defense_left){
                    hp2 = hp2 - WAVED_DEHP;
                }
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = attacked_right;
                update_position(player2[cond2], [x, y]);
        }
    }
    
    
    const new_position2 = query_position(player2[cond2]);
    const pre_position2 = query_position(player2[cond2]);
    const posi2 = query_position(player2[cond2]);
    let temp2 = player2;
    
    if(cond2 === punch_right){
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_right;
        update_position(player2[cond2], pre_position2);
    }
    if(cond2 === punch_left){
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_left;
        update_position(player2[cond2], pre_position2);
    }
    
    //updadte text
    update_text(find_xy2, "player2 at: " + stringify(posi2[0]) + "," + stringify(posi2[1]));
    update_position(find_xy2, [110, 200]);
    
    update_text(print_hp2, "HP of player2 : " + stringify(hp2));
    update_position(print_hp2, [400, 200]);
    
    if( gameobjects_overlap(boundry[LEFT], player2[cond2])){
        update_position(player2[cond2], [new_position2[0] + 10 * movement_dist, new_position2[1]]);
    }
    else if( gameobjects_overlap(boundry[RIGHT], player2[cond2])){
        update_position(player2[cond2], [new_position2[0] - 10 * movement_dist, new_position2[1]]);
    }
    else if( gameobjects_overlap(boundry[UP], player2[cond2])){
        update_position(player2[cond2], [new_position2[0], new_position2[1] + 10 * movement_dist]);
    }
    else if( gameobjects_overlap(boundry[DOWN], player2[cond2])){
        update_position(player2[cond2], [new_position2[0], new_position2[1] - 10 * movement_dist]);
    }
    
    
    
    
    if( check_barri(player2[cond2], barri) ){
        if( last_dir2 === UP ){
            update_position(player2[cond2], [new_position2[0], new_position2[1] + BARRI_BOUNCE_DIS]);
        }
        else if(last_dir2 === DOWN ){
            update_position(player2[cond2], [new_position2[0], new_position2[1] - BARRI_BOUNCE_DIS]);
        }
        else if(last_dir2 === LEFT ){
            update_position(player2[cond2], [new_position2[0] + BARRI_BOUNCE_DIS, new_position2[1]]);
        }
        else if(last_dir2 === RIGHT ){
            update_position(player2[cond2], [new_position2[0] - BARRI_BOUNCE_DIS, new_position2[1]]);
        }
    }
    
    //drag those who are out of rage
    if(posi2[0] < BOUNDRY_MIN ) {
        update_position(player2[cond2], [BOUNDRY_MIN + 35, posi2[1]]);
    }
    if(posi2[0] > BOUNDRY_MAX){
        update_position(player2[cond2], [BOUNDRY_MAX - 1  , posi2[1]]);
    }
    if(posi2[1] < BOUNDRY_MIN){
        update_position(player2[cond2], [posi2[0], BOUNDRY_MIN + 35]);
    }
    if(posi2[1] > BOUNDRY_MAX){
        update_position(player2[cond2], [posi2[0], BOUNDRY_MAX - 1 ]);
    }

    
    
    
    
    
   if (input_key_down("1") ) {
       add_vectors(new_position2, [0, JUMP_HEIGHT]);
       update_position(player2[cond2], new_position2);
       if( check_barri(player2[cond2], barri) ){
            if(last_dir2 === UP) {
                add_vectors(new_position2, [0, BARRI_BOUNCE_DIS]);
                update_position(player2[cond2], new_position2);
            }
       }
       last_dir2 = UP;
   }
   
   if (input_key_down("[")) {
        if( check_barri(player2[cond2], barri) ){
            if(last_dir2 === LEFT){
                add_vectors(new_position2, [BARRI_BOUNCE_DIS, 0]);
                update_position(player2[cond2], new_position2);
            }
       }
       else {
           update_position(player2[cond2], [-inf, -inf]);
            if(cond2 === player_towards_left ){
                cond2 = player_towards_left2;
            }
            else {
                cond2 = player_towards_left;
            }
            update_position(player2[cond2], new_position2);
            add_vectors(new_position2, [-1 * movement_dist, 0]);
            update_position(player2[cond2], new_position2);
       }
        last_dir2 = LEFT;
   }
   
   if (input_key_down("]")) {
       if( check_barri(player2[cond2], barri) ){
           if(last_dir2 === RIGHT){
                add_vectors(new_position2, [-1 * BARRI_BOUNCE_DIS, 0]);
                update_position(player2[cond2], new_position2);
           }
       }
       else{
            update_position(player2[cond2], [-inf, -inf]);
            if(cond2 === player_towards_right){
                cond2 = player_towards_right2;
            }
            else {
                cond2 = player_towards_right;
            }
            update_position(player2[cond2], pre_position2);
            add_vectors(new_position2, [movement_dist, 0]);
            update_position(player2[cond2], new_position2);
       }
       
       last_dir2 = RIGHT;
       
   }
   if(input_key_down("2")){
       if(cond2 === player_towards_right2 || cond2 === player_towards_right || cond2 === punch_right || cond2 === punch2_right){
           //cond = punch_right;
           if( check_barri(player2[cond2], barri) ){
                if(last_dir2 === RIGHT){
                    add_vectors(new_position2, [-1 * BARRI_BOUNCE_DIS, 0]);
                    update_position(player2[cond2], new_position2);
                }
            }
            else{
                update_position(player2[cond2], [-inf, -inf]);
                if(cond2 === punch_right){
                    cond2 = punch2_right;
                }
                else {
                    cond2 = punch_right;
                }
                update_position(player2[cond2], pre_position2);
                add_vectors(new_position2, [movement_dist, 0]);
                update_position(player2[cond2], new_position2);
            }
            last_dir2 = RIGHT;
       
       }
       else if(cond2 === player_towards_left2 || cond2 === player_towards_left || cond2 === punch2_left || cond2 === punch_left ){
           //cond = punch_left;
            if( check_barri(player2[cond2], barri) ){
                if(last_dir2 === LEFT){
                    add_vectors(new_position2, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player2[cond2], new_position2);
                }
            }
            else {
                update_position(player2[cond2], [-inf, -inf]);
                if(cond2 === punch_left){
                    cond2 = punch2_left;
                }
                else {
                    cond2 = punch_left;
                }
                update_position(player2[cond2], new_position2);
                add_vectors(new_position2, [-1 * movement_dist, 0]);
                update_position(player2[cond2], new_position2);
            }
            last_dir2 = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   
   if(query_position(player2[cond2])[0] > 0 && query_position(player2[cond2])[0] < 550 
        && query_position(player2[cond2])[1] > 0 && query_position(player2[cond2])[1] < 550){
            update_position(player2[cond2], [query_position(player2[cond2])[0], query_position(player2[cond2])[1] + g]);
        }
    last_dir2 = DOWN;//gravity
    if(hp2 <= 0){
        player2_alive =false;
    }
   // Update GameObjects within update_loop(...)wda
   //update_position(player[cond], new_position);
});
build_game();