import { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { Modal } from 'containers'
import {
  EMOJI_TOOLBAR,
  EventListener,
  toast,
  TOAST_MESSAGE,
  useObjectState,
  useUser
} from 'services'
import Fuse from 'fuse.js'

interface Emoji {
  emoji: string
  text: string
}
export interface Props extends ModalProps {
  onSelect: (text: string, emoji: string) => void
}
interface State {
  tab: keyof typeof EMOJI_TOOLBAR
  search: string
  text: string
  emoji: string
}

const EmojiModal: FC<Props> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null
  const [{ tab, search, text, emoji }, setState, onChange] =
    useObjectState<State>({
      tab: 'people',
      search: '',
      text: '',
      emoji: ''
    })
  const [user] = useUser()

  const onEmojiClick = (text: string, emoji: string) => {
    if (!user) toast.info(TOAST_MESSAGE.LOGIN_REQUIRED)
    else onSelect(text, emoji)
  }

  const tabs: Array<keyof typeof EMOJI_TOOLBAR> = useMemo(
    () => [
      'people',
      'nature',
      'food',
      'travel',
      'activity',
      'objects',
      'symbols',
      'flags'
    ],
    []
  )

  const people: Emoji[] = useMemo(
    () => [
      { text: 'grinning', emoji: '😀' },
      { text: 'speech', emoji: '💬' },
      { text: 'grin', emoji: '😁' },
      { text: 'joy', emoji: '😂' },
      { text: 'smiley', emoji: '😃' },
      { text: 'smile', emoji: '😄' },
      { text: 'sweat_smile', emoji: '😅' },
      { text: 'laughing', emoji: '😆' },
      { text: 'wink', emoji: '😉' },
      { text: 'blush', emoji: '😊' },
      { text: 'yum', emoji: '😋' },
      { text: 'sunglasses', emoji: '😎' },
      { text: 'heart_eyes', emoji: '😍' },
      { text: 'kissing_heart', emoji: '😘' },
      { text: 'kissing', emoji: '😗' },
      { text: 'kissing_smiling_eyes', emoji: '😙' },
      { text: 'kissing_closed_eyes', emoji: '😚' },
      { text: 'slightly_smiling_face', emoji: '🙂' },
      { text: 'hugging_face', emoji: '🤗' },
      { text: 'thinking_face', emoji: '🤔' },
      { text: 'neutral_face', emoji: '😐' },
      { text: 'expressionless', emoji: '😑' },
      { text: 'no_mouth', emoji: '😶' },
      { text: 'face_with_rolling_eyes', emoji: '🙄' },
      { text: 'smirk', emoji: '😏' },
      { text: 'persevere', emoji: '😣' },
      { text: 'disappointed_relieved', emoji: '😥' },
      { text: 'open_mouth', emoji: '😮' },
      { text: 'zipper_mouth_face', emoji: '🤐' },
      { text: 'hushed', emoji: '😯' },
      { text: 'sleepy', emoji: '😪' },
      { text: 'tired_face', emoji: '😫' },
      { text: 'sleeping', emoji: '😴' },
      { text: 'relieved', emoji: '😌' },
      { text: 'nerd_face', emoji: '🤓' },
      { text: 'stuck_out_tongue', emoji: '😛' },
      { text: 'stuck_out_tongue_winking_eye', emoji: '😜' },
      { text: 'stuck_out_tongue_closed_eyes', emoji: '😝' },
      { text: 'unamused', emoji: '😒' },
      { text: 'sweat', emoji: '😓' },
      { text: 'pensive', emoji: '😔' },
      { text: 'confused', emoji: '😕' },
      { text: 'upside_down_face', emoji: '🙃' },
      { text: 'money_mouth_face', emoji: '🤑' },
      { text: 'astonished', emoji: '😲' },
      { text: 'slightly_frowning_face', emoji: '🙁' },
      { text: 'confounded', emoji: '😖' },
      { text: 'disappointed', emoji: '😞' },
      { text: 'worried', emoji: '😟' },
      { text: 'triumph', emoji: '😤' },
      { text: 'cry', emoji: '😢' },
      { text: 'sob', emoji: '😭' },
      { text: 'frowning', emoji: '😦' },
      { text: 'anguished', emoji: '😧' },
      { text: 'fearful', emoji: '😨' },
      { text: 'weary', emoji: '😩' },
      { text: 'grimacing', emoji: '😬' },
      { text: 'cold_sweat', emoji: '😰' },
      { text: 'scream', emoji: '😱' },
      { text: 'flushed', emoji: '😳' },
      { text: 'dizzy_face', emoji: '😵' },
      { text: 'rage', emoji: '😡' },
      { text: 'angry', emoji: '😠' },
      { text: 'innocent', emoji: '😇' },
      { text: 'mask', emoji: '😷' },
      { text: 'face_with_thermometer', emoji: '🤒' },
      { text: 'face_with_head_bandage', emoji: '🤕' },
      { text: 'smiling_imp', emoji: '😈' },
      { text: 'imp', emoji: '👿' },
      { text: 'japanese_ogre', emoji: '👹' },
      { text: 'japanese_goblin', emoji: '👺' },
      { text: 'skull', emoji: '💀' },
      { text: 'ghost', emoji: '👻' },
      { text: 'alien', emoji: '👽' },
      { text: 'robot_face', emoji: '🤖' },
      { text: 'hankey', emoji: '💩' },
      { text: 'smiley_cat', emoji: '😺' },
      { text: 'smile_cat', emoji: '😸' },
      { text: 'joy_cat', emoji: '😹' },
      { text: 'heart_eyes_cat', emoji: '😻' },
      { text: 'smirk_cat', emoji: '😼' },
      { text: 'kissing_cat', emoji: '😽' },
      { text: 'scream_cat', emoji: '🙀' },
      { text: 'crying_cat_face', emoji: '😿' },
      { text: 'pouting_cat', emoji: '😾' },
      { text: 'boy', emoji: '👦' },
      { text: 'girl', emoji: '👧' },
      { text: 'man', emoji: '👨' },
      { text: 'woman', emoji: '👩' },
      { text: 'older_man', emoji: '👴' },
      { text: 'older_woman', emoji: '👵' },
      { text: 'baby', emoji: '👶' },
      { text: 'angel', emoji: '👼' },
      { text: 'cop', emoji: '👮' },
      { text: 'sleuth_or_spy', emoji: '🕵' },
      { text: 'guardsman', emoji: '💂' },
      { text: 'construction_worker', emoji: '👷' },
      { text: 'man_with_turban', emoji: '👳' },
      { text: 'person_with_blond_hair', emoji: '👱' },
      { text: 'santa', emoji: '🎅' },
      { text: 'princess', emoji: '👸' },
      { text: 'bride_with_veil', emoji: '👰' },
      { text: 'man_with_gua_pi_mao', emoji: '👲' },
      { text: 'person_frowning', emoji: '🙍' },
      { text: 'person_with_pouting_face', emoji: '🙎' },
      { text: 'no_good', emoji: '🙅' },
      { text: 'ok_woman', emoji: '🙆' },
      { text: 'information_desk_person', emoji: '💁' },
      { text: 'raising_hand', emoji: '🙋' },
      { text: 'bow', emoji: '🙇' },
      { text: 'massage', emoji: '💆' },
      { text: 'haircut', emoji: '💇' },
      { text: 'walking', emoji: '🚶' },
      { text: 'runner', emoji: '🏃' },
      { text: 'dancer', emoji: '💃' },
      { text: 'dancers', emoji: '👯' },
      { text: 'speaking_head_in_silhouette', emoji: '🗣' },
      { text: 'bust_in_silhouette', emoji: '👤' },
      { text: 'busts_in_silhouette', emoji: '👥' },
      { text: 'couple', emoji: '👫' },
      { text: 'two_men_holding_hands', emoji: '👬' },
      { text: 'two_women_holding_hands', emoji: '👭' },
      { text: 'couplekiss', emoji: '💏' },
      { text: 'couple_with_heart', emoji: '💑' },
      { text: 'family', emoji: '👪' },
      { text: 'muscle', emoji: '💪' },
      { text: 'point_left', emoji: '👈' },
      { text: 'point_right', emoji: '👉' },
      { text: 'point_up', emoji: '☝' },
      { text: 'point_up_2', emoji: '👆' },
      { text: 'middle_finger', emoji: '🖕' },
      { text: 'point_down', emoji: '👇' },
      { text: 'v', emoji: '✌' },
      { text: 'the_horns', emoji: '🤘' },
      { text: 'raised_hand_with_fingers_splayed', emoji: '🖐' },
      { text: 'ok_hand', emoji: '👌' },
      { text: 'thumbsup', emoji: '👍' },
      { text: 'thumbsdown', emoji: '👎' },
      { text: 'fist', emoji: '✊' },
      { text: 'facepunch', emoji: '👊' },
      { text: 'wave', emoji: '👋' },
      { text: 'clap', emoji: '👏' },
      { text: 'writing_hand', emoji: '✍' },
      { text: 'open_hands', emoji: '👐' },
      { text: 'raised_hands', emoji: '🙌' },
      { text: 'pray', emoji: '🙏' },
      { text: 'nail_care', emoji: '💅' },
      { text: 'ear', emoji: '👂' },
      { text: 'nose', emoji: '👃' },
      { text: 'footprints', emoji: '👣' },
      { text: 'eyes', emoji: '👀' },
      { text: 'eye', emoji: '👁' },
      { text: 'tongue', emoji: '👅' },
      { text: 'lips', emoji: '👄' },
      { text: 'kiss', emoji: '💋' },
      { text: 'zzz', emoji: '💤' },
      { text: 'eyeglasses', emoji: '👓' },
      { text: 'dark_sunglasses', emoji: '🕶' },
      { text: 'necktie', emoji: '👔' },
      { text: 'shirt', emoji: '👕' },
      { text: 'jeans', emoji: '👖' },
      { text: 'dress', emoji: '👗' },
      { text: 'kimono', emoji: '👘' },
      { text: 'bikini', emoji: '👙' },
      { text: 'womans_clothes', emoji: '👚' },
      { text: 'purse', emoji: '👛' },
      { text: 'handbag', emoji: '👜' },
      { text: 'pouch', emoji: '👝' },
      { text: 'school_satchel', emoji: '🎒' },
      { text: 'mans_shoe', emoji: '👞' },
      { text: 'athletic_shoe', emoji: '👟' },
      { text: 'high_heel', emoji: '👠' },
      { text: 'sandal', emoji: '👡' },
      { text: 'boot', emoji: '👢' },
      { text: 'crown', emoji: '👑' },
      { text: 'womans_hat', emoji: '👒' },
      { text: 'tophat', emoji: '🎩' },
      { text: 'mortar_board', emoji: '🎓' },
      { text: 'helmet_with_white_cross', emoji: '⛑' },
      { text: 'lipstick', emoji: '💄' },
      { text: 'ring', emoji: '💍' },
      { text: 'closed_umbrella', emoji: '🌂' },
      { text: 'briefcase', emoji: '💼' }
    ],
    []
  )

  const nature: Emoji[] = useMemo(
    () => [
      { text: 'see_no_evil', emoji: '🙈' },
      { text: 'hear_no_evil', emoji: '🙉' },
      { text: 'speak_no_evil', emoji: '🙊' },
      { text: 'sweat_drops', emoji: '💦' },
      { text: 'dash', emoji: '💨' },
      { text: 'monkey_face', emoji: '🐵' },
      { text: 'monkey', emoji: '🐒' },
      { text: 'dog', emoji: '🐶' },
      { text: 'dog2', emoji: '🐕' },
      { text: 'poodle', emoji: '🐩' },
      { text: 'wolf', emoji: '🐺' },
      { text: 'cat', emoji: '🐱' },
      { text: 'cat2', emoji: '🐈' },
      { text: 'lion_face', emoji: '🦁' },
      { text: 'tiger', emoji: '🐯' },
      { text: 'tiger2', emoji: '🐅' },
      { text: 'leopard', emoji: '🐆' },
      { text: 'horse', emoji: '🐴' },
      { text: 'racehorse', emoji: '🐎' },
      { text: 'unicorn_face', emoji: '🦄' },
      { text: 'cow', emoji: '🐮' },
      { text: 'ox', emoji: '🐂' },
      { text: 'water_buffalo', emoji: '🐃' },
      { text: 'cow2', emoji: '🐄' },
      { text: 'pig', emoji: '🐷' },
      { text: 'pig2', emoji: '🐖' },
      { text: 'boar', emoji: '🐗' },
      { text: 'pig_nose', emoji: '🐽' },
      { text: 'ram', emoji: '🐏' },
      { text: 'sheep', emoji: '🐑' },
      { text: 'goat', emoji: '🐐' },
      { text: 'dromedary_camel', emoji: '🐪' },
      { text: 'camel', emoji: '🐫' },
      { text: 'elephant', emoji: '🐘' },
      { text: 'mouse', emoji: '🐭' },
      { text: 'mouse2', emoji: '🐁' },
      { text: 'rat', emoji: '🐀' },
      { text: 'hamster', emoji: '🐹' },
      { text: 'rabbit', emoji: '🐰' },
      { text: 'rabbit2', emoji: '🐇' },
      { text: 'chipmunk', emoji: '🐿' },
      { text: 'bear', emoji: '🐻' },
      { text: 'koala', emoji: '🐨' },
      { text: 'panda_face', emoji: '🐼' },
      { text: 'feet', emoji: '🐾' },
      { text: 'turkey', emoji: '🦃' },
      { text: 'chicken', emoji: '🐔' },
      { text: 'rooster', emoji: '🐓' },
      { text: 'hatching_chick', emoji: '🐣' },
      { text: 'baby_chick', emoji: '🐤' },
      { text: 'hatched_chick', emoji: '🐥' },
      { text: 'bird', emoji: '🐦' },
      { text: 'penguin', emoji: '🐧' },
      { text: 'dove_of_peace', emoji: '🕊' },
      { text: 'frog', emoji: '🐸' },
      { text: 'crocodile', emoji: '🐊' },
      { text: 'turtle', emoji: '🐢' },
      { text: 'snake', emoji: '🐍' },
      { text: 'dragon_face', emoji: '🐲' },
      { text: 'dragon', emoji: '🐉' },
      { text: 'whale', emoji: '🐳' },
      { text: 'whale2', emoji: '🐋' },
      { text: 'dolphin', emoji: '🐬' },
      { text: 'fish', emoji: '🐟' },
      { text: 'tropical_fish', emoji: '🐠' },
      { text: 'blowfish', emoji: '🐡' },
      { text: 'octopus', emoji: '🐙' },
      { text: 'shell', emoji: '🐚' },
      { text: 'crab', emoji: '🦀' },
      { text: 'snail', emoji: '🐌' },
      { text: 'bug', emoji: '🐛' },
      { text: 'ant', emoji: '🐜' },
      { text: 'bee', emoji: '🐝' },
      { text: 'beetle', emoji: '🐞' },
      { text: 'spider', emoji: '🕷' },
      { text: 'spider_web', emoji: '🕸' },
      { text: 'scorpion', emoji: '🦂' },
      { text: 'bouquet', emoji: '💐' },
      { text: 'cherry_blossom', emoji: '🌸' },
      { text: 'rosette', emoji: '🏵' },
      { text: 'rose', emoji: '🌹' },
      { text: 'hibiscus', emoji: '🌺' },
      { text: 'sunflower', emoji: '🌻' },
      { text: 'blossom', emoji: '🌼' },
      { text: 'tulip', emoji: '🌷' },
      { text: 'seedling', emoji: '🌱' },
      { text: 'evergreen_tree', emoji: '🌲' },
      { text: 'deciduous_tree', emoji: '🌳' },
      { text: 'palm_tree', emoji: '🌴' },
      { text: 'cactus', emoji: '🌵' },
      { text: 'ear_of_rice', emoji: '🌾' },
      { text: 'herb', emoji: '🌿' },
      { text: 'shamrock', emoji: '☘' },
      { text: 'four_leaf_clover', emoji: '🍀' },
      { text: 'maple_leaf', emoji: '🍁' },
      { text: 'fallen_leaf', emoji: '🍂' },
      { text: 'leaves', emoji: '🍃' },
      { text: 'mushroom', emoji: '🍄' },
      { text: 'chestnut', emoji: '🌰' },
      { text: 'earth_africa', emoji: '🌍' },
      { text: 'earth_americas', emoji: '🌎' },
      { text: 'earth_asia', emoji: '🌏' },
      { text: 'new_moon', emoji: '🌑' },
      { text: 'waxing_crescent_moon', emoji: '🌒' },
      { text: 'first_quarter_moon', emoji: '🌓' },
      { text: 'full_moon', emoji: '🌕' },
      { text: 'waning_gibbous_moon', emoji: '🌖' },
      { text: 'last_quarter_moon', emoji: '🌗' },
      { text: 'waning_crescent_moon', emoji: '🌘' },
      { text: 'crescent_moon', emoji: '🌙' },
      { text: 'new_moon_with_face', emoji: '🌚' },
      { text: 'first_quarter_moon_with_face', emoji: '🌛' },
      { text: 'last_quarter_moon_with_face', emoji: '🌜' },
      { text: 'sunny', emoji: '☀' },
      { text: 'full_moon_with_face', emoji: '🌝' },
      { text: 'sun_with_face', emoji: '🌞' },
      { text: 'star', emoji: '⭐' },
      { text: 'star2', emoji: '🌟' },
      { text: 'cloud', emoji: '☁' },
      { text: 'partly_sunny', emoji: '⛅' },
      { text: 'thunder_cloud_and_rain', emoji: '⛈' },
      { text: 'rain_cloud', emoji: '🌧' },
      { text: 'snow_cloud', emoji: '🌨' },
      { text: 'fog', emoji: '🌫' },
      { text: 'wind_blowing_face', emoji: '🌬' },
      { text: 'umbrella', emoji: '☂' },
      { text: 'umbrella_with_rain_drops', emoji: '☔' },
      { text: 'zap', emoji: '⚡' },
      { text: 'snowflake', emoji: '❄' },
      { text: 'snowman', emoji: '☃' },
      { text: 'snowman_without_snow', emoji: '⛄' },
      { text: 'comet', emoji: '☄' },
      { text: 'fire', emoji: '🔥' },
      { text: 'droplet', emoji: '💧' },
      { text: 'ocean', emoji: '🌊' },
      { text: 'jack_o_lantern', emoji: '🎃' },
      { text: 'christmas_tree', emoji: '🎄' },
      { text: 'sparkles', emoji: '✨' },
      { text: 'tanabata_tree', emoji: '🎋' },
      { text: 'bamboo', emoji: '🎍' }
    ],
    []
  )

  const food: Emoji[] = useMemo(
    () => [
      { text: 'grapes', emoji: '🍇' },
      { text: 'melon', emoji: '🍈' },
      { text: 'watermelon', emoji: '🍉' },
      { text: 'tangerine', emoji: '🍊' },
      { text: 'lemon', emoji: '🍋' },
      { text: 'banana', emoji: '🍌' },
      { text: 'pineapple', emoji: '🍍' },
      { text: 'apple', emoji: '🍎' },
      { text: 'green_apple', emoji: '🍏' },
      { text: 'pear', emoji: '🍐' },
      { text: 'peach', emoji: '🍑' },
      { text: 'cherries', emoji: '🍒' },
      { text: 'strawberry', emoji: '🍓' },
      { text: 'tomato', emoji: '🍅' },
      { text: 'eggplant', emoji: '🍆' },
      { text: 'corn', emoji: '🌽' },
      { text: 'hot_pepper', emoji: '🌶' },
      { text: 'bread', emoji: '🍞' },
      { text: 'cheese_wedge', emoji: '🧀' },
      { text: 'meat_on_bone', emoji: '🍖' },
      { text: 'poultry_leg', emoji: '🍗' },
      { text: 'hamburger', emoji: '🍔' },
      { text: 'fries', emoji: '🍟' },
      { text: 'pizza', emoji: '🍕' },
      { text: 'hotdog', emoji: '🌭' },
      { text: 'taco', emoji: '🌮' },
      { text: 'burrito', emoji: '🌯' },
      { text: 'egg', emoji: '🥚' },
      { text: 'stew', emoji: '🍲' },
      { text: 'popcorn', emoji: '🍿' },
      { text: 'bento', emoji: '🍱' },
      { text: 'rice_cracker', emoji: '🍘' },
      { text: 'rice_ball', emoji: '🍙' },
      { text: 'rice', emoji: '🍚' },
      { text: 'curry', emoji: '🍛' },
      { text: 'ramen', emoji: '🍜' },
      { text: 'spaghetti', emoji: '🍝' },
      { text: 'sweet_potato', emoji: '🍠' },
      { text: 'oden', emoji: '🍢' },
      { text: 'sushi', emoji: '🍣' },
      { text: 'fried_shrimp', emoji: '🍤' },
      { text: 'fish_cake', emoji: '🍥' },
      { text: 'dango', emoji: '🍡' },
      { text: 'icecream', emoji: '🍦' },
      { text: 'shaved_ice', emoji: '🍧' },
      { text: 'ice_cream', emoji: '🍨' },
      { text: 'doughnut', emoji: '🍩' },
      { text: 'cookie', emoji: '🍪' },
      { text: 'birthday', emoji: '🎂' },
      { text: 'cake', emoji: '🍰' },
      { text: 'chocolate_bar', emoji: '🍫' },
      { text: 'candy', emoji: '🍬' },
      { text: 'lollipop', emoji: '🍭' },
      { text: 'custard', emoji: '🍮' },
      { text: 'honey_pot', emoji: '🍯' },
      { text: 'baby_bottle', emoji: '🍼' },
      { text: 'coffee', emoji: '☕' },
      { text: 'tea', emoji: '🍵' },
      { text: 'sake', emoji: '🍶' },
      { text: 'champagne', emoji: '🍾' },
      { text: 'wine_glass', emoji: '🍷' },
      { text: 'cocktail', emoji: '🍸' },
      { text: 'tropical_drink', emoji: '🍹' },
      { text: 'beer', emoji: '🍺' },
      { text: 'beers', emoji: '🍻' },
      { text: 'knife_fork_plate', emoji: '🍽' },
      { text: 'fork_and_knife', emoji: '🍴' }
    ],
    []
  )

  const symbols: Emoji[] = useMemo(
    () => [
      { text: 'cupid', emoji: '💘' },
      { text: 'heart', emoji: '❤' },
      { text: 'heartbeat', emoji: '💓' },
      { text: 'broken_heart', emoji: '💔' },
      { text: 'two_hearts', emoji: '💕' },
      { text: 'sparkling_heart', emoji: '💖' },
      { text: 'heartpulse', emoji: '💗' },
      { text: 'blue_heart', emoji: '💙' },
      { text: 'green_heart', emoji: '💚' },
      { text: 'yellow_heart', emoji: '💛' },
      { text: 'purple_heart', emoji: '💜' },
      { text: 'gift_heart', emoji: '💝' },
      { text: 'revolving_hearts', emoji: '💞' },
      { text: 'heart_decoration', emoji: '💟' },
      { text: 'heart_exclamation', emoji: '❣' },
      { text: 'anger', emoji: '💢' },
      { text: 'boom', emoji: '💥' },
      { text: 'dizzy', emoji: '💫' },
      { text: 'speech_balloon', emoji: '💬' },
      { text: 'left_speech_bubble', emoji: '🗨' },
      { text: 'right_anger_bubble', emoji: '🗯' },
      { text: 'thought_balloon', emoji: '💭' },
      { text: 'white_flower', emoji: '💮' },
      { text: 'globe_with_meridians', emoji: '🌐' },
      { text: 'hotsprings', emoji: '♨' },
      { text: 'octagonal_sign', emoji: '🛑' },
      { text: 'clock12', emoji: '🕛' },
      { text: 'clock1230', emoji: '🕧' },
      { text: 'clock1', emoji: '🕐' },
      { text: 'clock130', emoji: '🕜' },
      { text: 'clock2', emoji: '🕑' },
      { text: 'clock230', emoji: '🕝' },
      { text: 'clock3', emoji: '🕒' },
      { text: 'clock330', emoji: '🕞' },
      { text: 'clock4', emoji: '🕓' },
      { text: 'clock430', emoji: '🕟' },
      { text: 'clock5', emoji: '🕔' },
      { text: 'clock530', emoji: '🕠' },
      { text: 'clock6', emoji: '🕕' },
      { text: 'clock630', emoji: '🕡' },
      { text: 'clock7', emoji: '🕖' },
      { text: 'clock730', emoji: '🕢' },
      { text: 'clock8', emoji: '🕗' },
      { text: 'clock830', emoji: '🕣' },
      { text: 'clock9', emoji: '🕘' },
      { text: 'clock930', emoji: '🕤' },
      { text: 'clock10', emoji: '🕙' },
      { text: 'clock1030', emoji: '🕥' },
      { text: 'clock11', emoji: '🕚' },
      { text: 'clock1130', emoji: '🕦' },
      { text: 'cyclone', emoji: '🌀' },
      { text: 'spades', emoji: '♠' },
      { text: 'hearts', emoji: '♥' },
      { text: 'diamonds', emoji: '♦' },
      { text: 'clubs', emoji: '♣' },
      { text: 'black_joker', emoji: '🃏' },
      { text: 'mahjong', emoji: '🀄' },
      { text: 'flower_playing_cards', emoji: '🎴' },
      { text: 'mute', emoji: '🔇' },
      { text: 'speaker', emoji: '🔈' },
      { text: 'sound', emoji: '🔉' },
      { text: 'loud_sound', emoji: '🔊' },
      { text: 'loudspeaker', emoji: '📢' },
      { text: 'mega', emoji: '📣' },
      { text: 'bell', emoji: '🔔' },
      { text: 'no_bell', emoji: '🔕' },
      { text: 'musical_note', emoji: '🎵' },
      { text: 'notes', emoji: '🎶' },
      { text: 'chart', emoji: '💹' },
      { text: 'currency_exchange', emoji: '💱' },
      { text: 'heavy_dollar_sign', emoji: '💲' },
      { text: 'atm', emoji: '🏧' },
      { text: 'put_litter_in_its_place', emoji: '🚮' },
      { text: 'potable_water', emoji: '🚰' },
      { text: 'wheelchair', emoji: '♿' },
      { text: 'mens', emoji: '🚹' },
      { text: 'womens', emoji: '🚺' },
      { text: 'restroom', emoji: '🚻' },
      { text: 'baby_symbol', emoji: '🚼' },
      { text: 'wc', emoji: '🚾' },
      { text: 'passport_control', emoji: '🛂' },
      { text: 'customs', emoji: '🛃' },
      { text: 'baggage_claim', emoji: '🛄' },
      { text: 'left_luggage', emoji: '🛅' },
      { text: 'warning', emoji: '⚠' },
      { text: 'children_crossing', emoji: '🚸' },
      { text: 'no_entry', emoji: '⛔' },
      { text: 'no_entry_sign', emoji: '🚫' },
      { text: 'no_bicycles', emoji: '🚳' },
      { text: 'no_smoking', emoji: '🚭' },
      { text: 'do_not_litter', emoji: '🚯' },
      { text: 'non-potable_water', emoji: '🚱' },
      { text: 'no_pedestrians', emoji: '🚷' },
      { text: 'no_mobile_phones', emoji: '📵' },
      { text: 'underage', emoji: '🔞' },
      { text: 'radioactive', emoji: '☢' },
      { text: 'biohazard', emoji: '☣' },
      { text: 'arrow_up', emoji: '⬆' },
      { text: 'arrow_upper_right', emoji: '↗' },
      { text: 'arrow_right', emoji: '➡' },
      { text: 'arrow_lower_right', emoji: '↘' },
      { text: 'arrow_down', emoji: '⬇' },
      { text: 'arrow_lower_left', emoji: '↙' },
      { text: 'arrow_left', emoji: '⬅' },
      { text: 'arrow_upper_left', emoji: '↖' },
      { text: 'arrow_up_down', emoji: '↕' },
      { text: 'left_right_arrow', emoji: '↔' },
      { text: 'leftwards_arrow_with_hook', emoji: '↩' },
      { text: 'arrow_right_hook', emoji: '↪' },
      { text: 'arrow_heading_up', emoji: '⤴' },
      { text: 'arrow_heading_down', emoji: '⤵' },
      { text: 'arrows_clockwise', emoji: '🔃' },
      { text: 'arrows_counterclockwise', emoji: '🔄' },
      { text: 'back', emoji: '🔙' },
      { text: 'end', emoji: '🔚' },
      { text: 'on', emoji: '🔛' },
      { text: 'soon', emoji: '🔜' },
      { text: 'top', emoji: '🔝' },
      { text: 'place_of_worship', emoji: '🛐' },
      { text: 'atom_symbol', emoji: '⚛' },
      { text: 'om_symbol', emoji: '🕉' },
      { text: 'star_of_david', emoji: '✡' },
      { text: 'wheel_of_dharma', emoji: '☸' },
      { text: 'yin_yang', emoji: '☯' },
      { text: 'latin_cross', emoji: '✝' },
      { text: 'orthodox_cross', emoji: '☦' },
      { text: 'star_and_crescent', emoji: '☪' },
      { text: 'peace_symbol', emoji: '☮' },
      { text: 'menorah_with_nine_branches', emoji: '🕎' },
      { text: 'six_pointed_star', emoji: '🔯' },
      { text: 'aries', emoji: '♈' },
      { text: 'taurus', emoji: '♉' },
      { text: 'gemini', emoji: '♊' },
      { text: 'cancer', emoji: '♋' },
      { text: 'leo', emoji: '♌' },
      { text: 'virgo', emoji: '♍' },
      { text: 'libra', emoji: '♎' },
      { text: 'scorpius', emoji: '♏' },
      { text: 'sagittarius', emoji: '♐' },
      { text: 'capricorn', emoji: '♑' },
      { text: 'aquarius', emoji: '♒' },
      { text: 'pisces', emoji: '♓' },
      { text: 'ophiuchus', emoji: '⛎' },
      { text: 'twisted_rightwards_arrows', emoji: '🔀' },
      { text: 'repeat', emoji: '🔁' },
      { text: 'repeat_one', emoji: '🔂' },
      { text: 'arrow_forward', emoji: '▶' },
      { text: 'fast_forward', emoji: '⏩' },
      {
        text: 'black_right_pointing_double_triangle_with_vertical_bar',
        emoji: '⏭'
      },
      {
        text: 'black_right_pointing_triangle_with_double_vertical_bar',
        emoji: '⏯'
      },
      { text: 'arrow_backward', emoji: '◀' },
      { text: 'rewind', emoji: '⏪' },
      {
        text: 'black_left_pointing_double_triangle_with_vertical_bar',
        emoji: '⏮'
      },
      { text: 'arrow_up_small', emoji: '🔼' },
      { text: 'arrow_double_up', emoji: '⏫' },
      { text: 'arrow_down_small', emoji: '🔽' },
      { text: 'arrow_double_down', emoji: '⏬' },
      { text: 'double_vertical_bar', emoji: '⏸' },
      { text: 'black_square_for_stop', emoji: '⏹' },
      { text: 'black_circle_for_record', emoji: '⏺' },
      { text: 'cinema', emoji: '🎦' },
      { text: 'low_brightness', emoji: '🔅' },
      { text: 'high_brightness', emoji: '🔆' },
      { text: 'signal_strength', emoji: '📶' },
      { text: 'vibration_mode', emoji: '📳' },
      { text: 'mobile_phone_off', emoji: '📴' },
      { text: 'recycle', emoji: '♻' },
      { text: 'name_badge', emoji: '📛' },
      { text: 'fleur_de_lis', emoji: '⚜' },
      { text: 'beginner', emoji: '🔰' },
      { text: 'trident', emoji: '🔱' },
      { text: 'o', emoji: '⭕' },
      { text: 'white_check_mark', emoji: '✅' },
      { text: 'ballot_box_with_check', emoji: '☑' },
      { text: 'heavy_check_mark', emoji: '✔' },
      { text: 'heavy_multiplication_x', emoji: '✖' },
      { text: 'x', emoji: '❌' },
      { text: 'negative_squared_cross_mark', emoji: '❎' },
      { text: 'heavy_plus_sign', emoji: '➕' },
      { text: 'heavy_minus_sign', emoji: '➖' },
      { text: 'heavy_division_sign', emoji: '➗' },
      { text: 'curly_loop', emoji: '➰' },
      { text: 'loop', emoji: '➿' },
      { text: 'part_alternation_mark', emoji: '〽' },
      { text: 'eight_spoked_asterisk', emoji: '✳' },
      { text: 'eight_pointed_black_star', emoji: '✴' },
      { text: 'sparkle', emoji: '❇' },
      { text: 'bangbang', emoji: '‼' },
      { text: 'interrobang', emoji: '⁉' },
      { text: 'question', emoji: '❓' },
      { text: 'grey_question', emoji: '❔' },
      { text: 'grey_exclamation', emoji: '❕' },
      { text: 'exclamation', emoji: '❗' },
      { text: 'wavy_dash', emoji: '〰' },
      { text: 'copyright', emoji: '©' },
      { text: 'registered', emoji: '®' },
      { text: 'tm', emoji: '™' },
      { text: 'hash', emoji: '#⃣' },
      { text: 'keycap_star', emoji: '*⃣' },
      { text: 'zero', emoji: '0⃣' },
      { text: 'one', emoji: '1⃣' },
      { text: 'two', emoji: '2⃣' },
      { text: 'three', emoji: '3⃣' },
      { text: 'four', emoji: '4⃣' },
      { text: 'five', emoji: '5⃣' },
      { text: 'six', emoji: '6⃣' },
      { text: 'seven', emoji: '7⃣' },
      { text: 'eight', emoji: '8⃣' },
      { text: 'nine', emoji: '9⃣' },
      { text: 'keycap_ten', emoji: '🔟' },
      { text: '100', emoji: '💯' },
      { text: 'capital_abcd', emoji: '🔠' },
      { text: 'abcd', emoji: '🔡' },
      { text: '1234', emoji: '🔢' },
      { text: 's', emoji: '🔣' },
      { text: 'abc', emoji: '🔤' },
      { text: 'a', emoji: '🅰' },
      { text: 'ab', emoji: '🆎' },
      { text: 'b', emoji: '🅱' },
      { text: 'cl', emoji: '🆑' },
      { text: 'cool', emoji: '🆒' },
      { text: 'free', emoji: '🆓' },
      { text: 'information_source', emoji: 'ℹ' },
      { text: 'id', emoji: '🆔' },
      { text: 'tv', emoji: 'Ⓜ' },
      { text: 'new', emoji: '🆕' },
      { text: 'ng', emoji: '🆖' },
      { text: 'o2', emoji: '🅾' },
      { text: 'ok', emoji: '🆗' },
      { text: 'parking', emoji: '🅿' },
      { text: 'sos', emoji: '🆘' },
      { text: 'up', emoji: '🆙' },
      { text: 'vs', emoji: '🆚' },
      { text: 'koko', emoji: '🈁' },
      { text: 'sa', emoji: '🈂' },
      { text: 'u6708', emoji: '🈷' },
      { text: 'u6709', emoji: '🈶' },
      { text: 'u6307', emoji: '🈯' },
      { text: 'ideograph_advantage', emoji: '🉐' },
      { text: 'u5272', emoji: '🈹' },
      { text: 'u7121', emoji: '🈚' },
      { text: 'u7981', emoji: '🈲' },
      { text: 'accept', emoji: '🉑' },
      { text: 'u7533', emoji: '🈸' },
      { text: 'u5408', emoji: '🈴' },
      { text: 'u7a7a', emoji: '🈳' },
      { text: 'congratulations', emoji: '㊗' },
      { text: 'secret', emoji: '㊙' },
      { text: 'u55b6', emoji: '🈺' },
      { text: 'u6e80', emoji: '🈵' },
      { text: 'black_small_square', emoji: '▪' },
      { text: 'white_small_square', emoji: '▫' },
      { text: 'white_medium_square', emoji: '◻' },
      { text: 'black_medium_square', emoji: '◼' },
      { text: 'white_medium_small_square', emoji: '◽' },
      { text: 'black_medium_small_square', emoji: '◾' },
      { text: 'black_large_square', emoji: '⬛' },
      { text: 'white_large_square', emoji: '⬜' },
      { text: 'large_orange_diamond', emoji: '🔶' },
      { text: 'large_blue_diamond', emoji: '🔷' },
      { text: 'small_orange_diamond', emoji: '🔸' },
      { text: 'small_blue_diamond', emoji: '🔹' },
      { text: 'small_red_triangle', emoji: '🔺' },
      { text: 'small_red_triangle_down', emoji: '🔻' },
      { text: 'diamond_shape_with_a_dot_inside', emoji: '💠' },
      { text: 'radio_button', emoji: '🔘' },
      { text: 'black_square_button', emoji: '🔲' },
      { text: 'white_square_button', emoji: '🔳' },
      { text: 'white_circle', emoji: '⚪' },
      { text: 'black_circle', emoji: '⚫' },
      { text: 'red_circle', emoji: '🔴' },
      { text: 'large_blue_circle', emoji: '🔵' }
    ],
    []
  )

  const activity: Emoji[] = useMemo(
    () => [
      { text: 'space_invader', emoji: '👾' },
      { text: 'man_in_business_suit_levitating', emoji: '🕴' },
      { text: 'horse_racing', emoji: '🏇' },
      { text: 'skier', emoji: '⛷' },
      { text: 'snowboarder', emoji: '🏂' },
      { text: 'golfer', emoji: '🏌' },
      { text: 'surfer', emoji: '🏄' },
      { text: 'rowboat', emoji: '🚣' },
      { text: 'swimmer', emoji: '🏊' },
      { text: 'person_with_ball', emoji: '⛹' },
      { text: 'weight_lifter', emoji: '🏋' },
      { text: 'bicyclist', emoji: '🚴' },
      { text: 'mountain_bicyclist', emoji: '🚵' },
      { text: 'circus_tent', emoji: '🎪' },
      { text: 'performing_arts', emoji: '🎭' },
      { text: 'art', emoji: '🎨' },
      { text: 'slot_machine', emoji: '🎰' },
      { text: 'bath', emoji: '🛀' },
      { text: 'reminder_ribbon', emoji: '🎗' },
      { text: 'admission_tickets', emoji: '🎟' },
      { text: 'ticket', emoji: '🎫' },
      { text: 'medal', emoji: '🎖' },
      { text: 'trophy', emoji: '🏆' },
      { text: 'sports_medal', emoji: '🏅' },
      { text: 'soccer', emoji: '⚽' },
      { text: 'baseball', emoji: '⚾' },
      { text: 'basketball', emoji: '🏀' },
      { text: 'volleyball', emoji: '🏐' },
      { text: 'football', emoji: '🏈' },
      { text: 'rugby_football', emoji: '🏉' },
      { text: 'tennis', emoji: '🎾' },
      { text: '8ball', emoji: '🎱' },
      { text: 'bowling', emoji: '🎳' },
      { text: 'cricket_bat_and_ball', emoji: '🏏' },
      { text: 'field_hockey_stick_and_ball', emoji: '🏑' },
      { text: 'ice_hockey_stick_and_puck', emoji: '🏒' },
      { text: 'table_tennis_paddle_and_ball', emoji: '🏓' },
      { text: 'badminton_racquet_and_shuttlecock', emoji: '🏸' },
      { text: 'dart', emoji: '🎯' },
      { text: 'golf', emoji: '⛳' },
      { text: 'ice_skate', emoji: '⛸' },
      { text: 'fishing_pole_and_fish', emoji: '🎣' },
      { text: 'running_shirt_with_sash', emoji: '🎽' },
      { text: 'ski', emoji: '🎿' },
      { text: 'video_game', emoji: '🎮' },
      { text: 'game_die', emoji: '🎲' },
      { text: 'musical_score', emoji: '🎼' },
      { text: 'microphone', emoji: '🎤' },
      { text: 'headphones', emoji: '🎧' },
      { text: 'saxophone', emoji: '🎷' },
      { text: 'guitar', emoji: '🎸' },
      { text: 'musical_keyboard', emoji: '🎹' },
      { text: 'trumpet', emoji: '🎺' },
      { text: 'violin', emoji: '🎻' },
      { text: 'clapper', emoji: '🎬' },
      { text: 'bow_and_arrow', emoji: '🏹' }
    ],
    []
  )

  const travel: Emoji[] = useMemo(
    () => [
      { text: 'racing_car', emoji: '🏎' },
      { text: 'racing_motorcycle', emoji: '🏍' },
      { text: 'japan', emoji: '🗾' },
      { text: 'snow_capped_mountain', emoji: '🏔' },
      { text: 'mountain', emoji: '⛰' },
      { text: 'volcano', emoji: '🌋' },
      { text: 'mount_fuji', emoji: '🗻' },
      { text: 'camping', emoji: '🏕' },
      { text: 'beach_with_umbrella', emoji: '🏖' },
      { text: 'desert', emoji: '🏜' },
      { text: 'desert_island', emoji: '🏝' },
      { text: 'national_park', emoji: '🏞' },
      { text: 'stadium', emoji: '🏟' },
      { text: 'classical_building', emoji: '🏛' },
      { text: 'building_construction', emoji: '🏗' },
      { text: 'house_buildings', emoji: '🏘' },
      { text: 'cityscape', emoji: '🏙' },
      { text: 'derelict_house_building', emoji: '🏚' },
      { text: 'house', emoji: '🏠' },
      { text: 'house_with_garden', emoji: '🏡' },
      { text: 'office', emoji: '🏢' },
      { text: 'post_office', emoji: '🏣' },
      { text: 'european_post_office', emoji: '🏤' },
      { text: 'hospital', emoji: '🏥' },
      { text: 'bank', emoji: '🏦' },
      { text: 'hotel', emoji: '🏨' },
      { text: 'love_hotel', emoji: '🏩' },
      { text: 'convenience_store', emoji: '🏪' },
      { text: 'school', emoji: '🏫' },
      { text: 'department_store', emoji: '🏬' },
      { text: 'factory', emoji: '🏭' },
      { text: 'japanese_castle', emoji: '🏯' },
      { text: 'european_castle', emoji: '🏰' },
      { text: 'wedding', emoji: '💒' },
      { text: 'tokyo_tower', emoji: '🗼' },
      { text: 'statue_of_liberty', emoji: '🗽' },
      { text: 'church', emoji: '⛪' },
      { text: 'mosque', emoji: '🕌' },
      { text: 'synagogue', emoji: '🕍' },
      { text: 'shinto_shrine', emoji: '⛩' },
      { text: 'kaaba', emoji: '🕋' },
      { text: 'fountain', emoji: '⛲' },
      { text: 'tent', emoji: '⛺' },
      { text: 'foggy', emoji: '🌁' },
      { text: 'night_with_stars', emoji: '🌃' },
      { text: 'sunrise_over_mountains', emoji: '🌄' },
      { text: 'sunrise', emoji: '🌅' },
      { text: 'city_sunset', emoji: '🌇' },
      { text: 'bridge_at_night', emoji: '🌉' },
      { text: 'milky_way', emoji: '🌌' },
      { text: 'carousel_horse', emoji: '🎠' },
      { text: 'ferris_wheel', emoji: '🎡' },
      { text: 'roller_coaster', emoji: '🎢' },
      { text: 'steam_locomotive', emoji: '🚂' },
      { text: 'railway_car', emoji: '🚃' },
      { text: 'bullettrain_side', emoji: '🚄' },
      { text: 'bullettrain_front', emoji: '🚅' },
      { text: 'train2', emoji: '🚆' },
      { text: 'metro', emoji: '🚇' },
      { text: 'light_rail', emoji: '🚈' },
      { text: 'station', emoji: '🚉' },
      { text: 'tram', emoji: '🚊' },
      { text: 'monorail', emoji: '🚝' },
      { text: 'mountain_railway', emoji: '🚞' },
      { text: 'train', emoji: '🚋' },
      { text: 'bus', emoji: '🚌' },
      { text: 'oncoming_bus', emoji: '🚍' },
      { text: 'trolleybus', emoji: '🚎' },
      { text: 'minibus', emoji: '🚐' },
      { text: 'ambulance', emoji: '🚑' },
      { text: 'fire_engine', emoji: '🚒' },
      { text: 'police_car', emoji: '🚓' },
      { text: 'oncoming_police_car', emoji: '🚔' },
      { text: 'taxi', emoji: '🚕' },
      { text: 'oncoming_taxi', emoji: '🚖' },
      { text: 'car', emoji: '🚗' },
      { text: 'oncoming_automobile', emoji: '🚘' },
      { text: 'blue_car', emoji: '🚙' },
      { text: 'truck', emoji: '🚚' },
      { text: 'articulated_lorry', emoji: '🚛' },
      { text: 'tractor', emoji: '🚜' },
      { text: 'bike', emoji: '🚲' },
      { text: 'busstop', emoji: '🚏' },
      { text: 'motorway', emoji: '🛣' },
      { text: 'railway_track', emoji: '🛤' },
      { text: 'fuelpump', emoji: '⛽' },
      { text: 'rotating_light', emoji: '🚨' },
      { text: 'traffic_light', emoji: '🚥' },
      { text: 'vertical_traffic_light', emoji: '🚦' },
      { text: 'construction', emoji: '🚧' },
      { text: 'anchor', emoji: '⚓' },
      { text: 'boat', emoji: '⛵' },
      { text: 'speedboat', emoji: '🚤' },
      { text: 'passenger_ship', emoji: '🛳' },
      { text: 'ferry', emoji: '⛴' },
      { text: 'motor_boat', emoji: '🛥' },
      { text: 'ship', emoji: '🚢' },
      { text: 'airplane', emoji: '✈' },
      { text: 'small_airplane', emoji: '🛩' },
      { text: 'airplane_departure', emoji: '🛫' },
      { text: 'airplane_arriving', emoji: '🛬' },
      { text: 'seat', emoji: '💺' },
      { text: 'helicopter', emoji: '🚁' },
      { text: 'suspension_railway', emoji: '🚟' },
      { text: 'mountain_cableway', emoji: '🚠' },
      { text: 'aerial_tramway', emoji: '🚡' },
      { text: 'rocket', emoji: '🚀' },
      { text: 'satellite', emoji: '🛰' },
      { text: 'stars', emoji: '🌠' },
      { text: 'rainbow', emoji: '🌈' },
      { text: 'fireworks', emoji: '🎆' },
      { text: 'sparkler', emoji: '🎇' },
      { text: 'rice_scene', emoji: '🎑' },
      { text: 'checkered_flag', emoji: '🏁' }
    ],
    []
  )

  const objects: Emoji[] = useMemo(
    () => [
      { text: 'skull_and_crossbones', emoji: '☠' },
      { text: 'love_letter', emoji: '💌' },
      { text: 'bomb', emoji: '💣' },
      { text: 'hole', emoji: '🕳' },
      { text: 'shopping_bags', emoji: '🛍' },
      { text: 'prayer_beads', emoji: '📿' },
      { text: 'gem', emoji: '💎' },
      { text: 'amphora', emoji: '🏺' },
      { text: 'world_map', emoji: '🗺' },
      { text: 'barber', emoji: '💈' },
      { text: 'frame_with_picture', emoji: '🖼' },
      { text: 'bellhop_bell', emoji: '🛎' },
      { text: 'door', emoji: '🚪' },
      { text: 'sleeping_accommodation', emoji: '🛌' },
      { text: 'bed', emoji: '🛏' },
      { text: 'couch_and_lamp', emoji: '🛋' },
      { text: 'toilet', emoji: '🚽' },
      { text: 'shower', emoji: '🚿' },
      { text: 'bathtub', emoji: '🛁' },
      { text: 'hourglass', emoji: '⌛' },
      { text: 'hourglass_flowing_sand', emoji: '⏳' },
      { text: 'watch', emoji: '⌚' },
      { text: 'alarm_clock', emoji: '⏰' },
      { text: 'stopwatch', emoji: '⏱' },
      { text: 'timer_clock', emoji: '⏲' },
      { text: 'mantelpiece_clock', emoji: '🕰' },
      { text: 'thermometer', emoji: '🌡' },
      { text: 'beach_umbrella', emoji: '⛱' },
      { text: 'balloon', emoji: '🎈' },
      { text: 'tada', emoji: '🎉' },
      { text: 'confetti_ball', emoji: '🎊' },
      { text: 'dolls', emoji: '🎎' },
      { text: 'f', emoji: '🎏' },
      { text: 'wind_chime', emoji: '🎐' },
      { text: 'ribbon', emoji: '🎀' },
      { text: 'gift', emoji: '🎁' },
      { text: 'joystick', emoji: '🕹' },
      { text: 'postal_horn', emoji: '📯' },
      { text: 'studio_microphone', emoji: '🎙' },
      { text: 'level_slider', emoji: '🎚' },
      { text: 'control_knobs', emoji: '🎛' },
      { text: 'radio', emoji: '📻' },
      { text: 'iphone', emoji: '📱' },
      { text: 'calling', emoji: '📲' },
      { text: 'telephone', emoji: '☎' },
      { text: 'telephone_receiver', emoji: '📞' },
      { text: 'pager', emoji: '📟' },
      { text: 'fax', emoji: '📠' },
      { text: 'battery', emoji: '🔋' },
      { text: 'electric_plug', emoji: '🔌' },
      { text: 'computer', emoji: '💻' },
      { text: 'desktop_computer', emoji: '🖥' },
      { text: 'printer', emoji: '🖨' },
      { text: 'keyboard', emoji: '⌨' },
      { text: 'three_button_mouse', emoji: '🖱' },
      { text: 'trackball', emoji: '🖲' },
      { text: 'minidisc', emoji: '💽' },
      { text: 'floppy_disk', emoji: '💾' },
      { text: 'cd', emoji: '💿' },
      { text: 'dvd', emoji: '📀' },
      { text: 'movie_camera', emoji: '🎥' },
      { text: 'film_frames', emoji: '🎞' },
      { text: 'film_projector', emoji: '📽' },
      { text: 'tv', emoji: '📺' },
      { text: 'camera', emoji: '📷' },
      { text: 'camera_with_flash', emoji: '📸' },
      { text: 'video_camera', emoji: '📹' },
      { text: 'vhs', emoji: '📼' },
      { text: 'mag', emoji: '🔍' },
      { text: 'mag_right', emoji: '🔎' },
      { text: 'microscope', emoji: '🔬' },
      { text: 'telescope', emoji: '🔭' },
      { text: 'satellite_antenna', emoji: '📡' },
      { text: 'candle', emoji: '🕯' },
      { text: 'bulb', emoji: '💡' },
      { text: 'flashlight', emoji: '🔦' },
      { text: 'izakaya_lantern', emoji: '🏮' },
      { text: 'notebook_with_decorative_cover', emoji: '📔' },
      { text: 'closed_book', emoji: '📕' },
      { text: 'book', emoji: '📖' },
      { text: 'green_book', emoji: '📗' },
      { text: 'blue_book', emoji: '📘' },
      { text: 'orange_book', emoji: '📙' },
      { text: 'books', emoji: '📚' },
      { text: 'notebook', emoji: '📓' },
      { text: 'ledger', emoji: '📒' },
      { text: 'page_with_curl', emoji: '📃' },
      { text: 'scroll', emoji: '📜' },
      { text: 'page_facing_up', emoji: '📄' },
      { text: 'newspaper', emoji: '📰' },
      { text: 'rolled_up_newspaper', emoji: '🗞' },
      { text: 'bookmark_tabs', emoji: '📑' },
      { text: 'bookmark', emoji: '🔖' },
      { text: 'label', emoji: '🏷' },
      { text: 'moneybag', emoji: '💰' },
      { text: 'yen', emoji: '💴' },
      { text: 'dollar', emoji: '💵' },
      { text: 'euro', emoji: '💶' },
      { text: 'pound', emoji: '💷' },
      { text: 'money_with_wings', emoji: '💸' },
      { text: 'credit_card', emoji: '💳' },
      { text: 'e-mail', emoji: '📧' },
      { text: 'incoming_envelope', emoji: '📨' },
      { text: 'envelope_with_arrow', emoji: '📩' },
      { text: 'outbox_tray', emoji: '📤' },
      { text: 'inbox_tray', emoji: '📥' },
      { text: 'package', emoji: '📦' },
      { text: 'mailbox', emoji: '📫' },
      { text: 'mailbox_closed', emoji: '📪' },
      { text: 'mailbox_with_mail', emoji: '📬' },
      { text: 'mailbox_with_no_mail', emoji: '📭' },
      { text: 'postbox', emoji: '📮' },
      { text: 'ballot_box_with_ballot', emoji: '🗳' },
      { text: 'pencil2', emoji: '✏' },
      { text: 'black_nib', emoji: '✒' },
      { text: 'lower_left_fountain_pen', emoji: '🖋' },
      { text: 'lower_left_ballpoint_pen', emoji: '🖊' },
      { text: 'lower_left_paintbrush', emoji: '🖌' },
      { text: 'lower_left_crayon', emoji: '🖍' },
      { text: 'memo', emoji: '📝' },
      { text: 'file_folder', emoji: '📁' },
      { text: 'open_file_folder', emoji: '📂' },
      { text: 'card_index_dividers', emoji: '🗂' },
      { text: 'date', emoji: '📅' },
      { text: 'calendar', emoji: '📆' },
      { text: 'spiral_note_pad', emoji: '🗒' },
      { text: 'spiral_calendar_pad', emoji: '🗓' },
      { text: 'card_index', emoji: '📇' },
      { text: 'chart_with_upwards_trend', emoji: '📈' },
      { text: 'chart_with_downwards_trend', emoji: '📉' },
      { text: 'bar_chart', emoji: '📊' },
      { text: 'clipboard', emoji: '📋' },
      { text: 'pushpin', emoji: '📌' },
      { text: 'round_pushpin', emoji: '📍' },
      { text: 'paperclip', emoji: '📎' },
      { text: 'linked_paperclips', emoji: '🖇' },
      { text: 'straight_ruler', emoji: '📏' },
      { text: 'triangular_ruler', emoji: '📐' },
      { text: 'scissors', emoji: '✂' },
      { text: 'card_file_box', emoji: '🗃' },
      { text: 'file_cabinet', emoji: '🗄' },
      { text: 'wastebasket', emoji: '🗑' },
      { text: 'lock', emoji: '🔒' },
      { text: 'unlock', emoji: '🔓' },
      { text: 'lock_with_ink_pen', emoji: '🔏' },
      { text: 'closed_lock_with_key', emoji: '🔐' },
      { text: 'key', emoji: '🔑' },
      { text: 'old_key', emoji: '🗝' },
      { text: 'hammer', emoji: '🔨' },
      { text: 'pick', emoji: '⛏' },
      { text: 'hammer_and_pick', emoji: '⚒' },
      { text: 'hammer_and_wrench', emoji: '🛠' },
      { text: 'dagger_knife', emoji: '🗡' },
      { text: 'crossed_swords', emoji: '⚔' },
      { text: 'gun', emoji: '🔫' },
      { text: 'shield', emoji: '🛡' },
      { text: 'wrench', emoji: '🔧' },
      { text: 'nut_and_bolt', emoji: '🔩' },
      { text: 'gear', emoji: '⚙' },
      { text: 'compression', emoji: '🗜' },
      { text: 'alembic', emoji: '⚗' },
      { text: 'scales', emoji: '⚖' },
      { text: 'link', emoji: '🔗' },
      { text: 'chains', emoji: '⛓' },
      { text: 'syringe', emoji: '💉' },
      { text: 'pill', emoji: '💊' },
      { text: 'smoking', emoji: '🚬' },
      { text: 'coffin', emoji: '⚰' },
      { text: 'funeral_urn', emoji: '⚱' },
      { text: 'moyai', emoji: '🗿' },
      { text: 'oil_drum', emoji: '🛢' },
      { text: 'crystal_ball', emoji: '🔮' },
      { text: 'triangular_flag_on_post', emoji: '🚩' },
      { text: 'crossed_flags', emoji: '🎌' },
      { text: 'waving_black_flag', emoji: '🏴' },
      { text: 'waving_white_flag', emoji: '🏳' }
    ],
    []
  )

  const flags: Emoji[] = useMemo(
    () => [
      { text: 'flag-ac', emoji: '🇦🇨' },
      { text: 'flag-ad', emoji: '🇦🇩' },
      { text: 'flag-ae', emoji: '🇦🇪' },
      { text: 'flag-af', emoji: '🇦🇫' },
      { text: 'flag-ag', emoji: '🇦🇬' },
      { text: 'flag-ai', emoji: '🇦🇮' },
      { text: 'flag-al', emoji: '🇦🇱' },
      { text: 'flag-am', emoji: '🇦🇲' },
      { text: 'flag-ao', emoji: '🇦🇴' },
      { text: 'flag-aq', emoji: '🇦🇶' },
      { text: 'flag-ar', emoji: '🇦🇷' },
      { text: 'flag-as', emoji: '🇦🇸' },
      { text: 'flag-at', emoji: '🇦🇹' },
      { text: 'flag-au', emoji: '🇦🇺' },
      { text: 'flag-aw', emoji: '🇦🇼' },
      { text: 'flag-ax', emoji: '🇦🇽' },
      { text: 'flag-az', emoji: '🇦🇿' },
      { text: 'flag-ba', emoji: '🇧🇦' },
      { text: 'flag-bb', emoji: '🇧🇧' },
      { text: 'flag-bd', emoji: '🇧🇩' },
      { text: 'flag-be', emoji: '🇧🇪' },
      { text: 'flag-bf', emoji: '🇧🇫' },
      { text: 'flag-bg', emoji: '🇧🇬' },
      { text: 'flag-bh', emoji: '🇧🇭' },
      { text: 'flag-bi', emoji: '🇧🇮' },
      { text: 'flag-bj', emoji: '🇧🇯' },
      { text: 'flag-bl', emoji: '🇧🇱' },
      { text: 'flag-bm', emoji: '🇧🇲' },
      { text: 'flag-bn', emoji: '🇧🇳' },
      { text: 'flag-bo', emoji: '🇧🇴' },
      { text: 'flag-bq', emoji: '🇧🇶' },
      { text: 'flag-br', emoji: '🇧🇷' },
      { text: 'flag-bs', emoji: '🇧🇸' },
      { text: 'flag-bt', emoji: '🇧🇹' },
      { text: 'flag-bv', emoji: '🇧🇻' },
      { text: 'flag-bw', emoji: '🇧🇼' },
      { text: 'flag-by', emoji: '🇧🇾' },
      { text: 'flag-bz', emoji: '🇧🇿' },
      { text: 'flag-ca', emoji: '🇨🇦' },
      { text: 'flag-cc', emoji: '🇨🇨' },
      { text: 'flag-cd', emoji: '🇨🇩' },
      { text: 'flag-cf', emoji: '🇨🇨' },
      { text: 'flag-cg', emoji: '🇨🇬' },
      { text: 'flag-ch', emoji: '🇨🇭' },
      { text: 'flag-ci', emoji: '🇨🇮' },
      { text: 'flag-ck', emoji: '🇨🇰' },
      { text: 'flag-cl', emoji: '🇨🇱' },
      { text: 'flag-cm', emoji: '🇨🇲' },
      { text: 'flag-cn', emoji: '🇨🇳' },
      { text: 'flag-co', emoji: '🇨🇴' },
      { text: 'flag-cp', emoji: '🇨🇵' },
      { text: 'flag-cr', emoji: '🇨🇷' },
      { text: 'flag-cu', emoji: '🇨🇺' },
      { text: 'flag-cv', emoji: '🇨🇻' },
      { text: 'flag-cw', emoji: '🇨🇼' },
      { text: 'flag-cx', emoji: '🇨🇽' },
      { text: 'flag-cy', emoji: '🇨🇾' },
      { text: 'flag-cz', emoji: '🇨🇿' },
      { text: 'flag-de', emoji: '🇩🇪' },
      { text: 'flag-dg', emoji: '🇩🇬' },
      { text: 'flag-dj', emoji: '🇩🇯' },
      { text: 'flag-dk', emoji: '🇩🇰' },
      { text: 'flag-dm', emoji: '🇩🇲' },
      { text: 'flag-do', emoji: '🇩🇴' },
      { text: 'flag-dz', emoji: '🇩🇿' },
      { text: 'flag-ea', emoji: '🇪🇦' },
      { text: 'flag-ec', emoji: '🇪🇨' },
      { text: 'flag-ee', emoji: '🇪🇪' },
      { text: 'flag-eg', emoji: '🇪🇬' },
      { text: 'flag-eh', emoji: '🇪🇭' },
      { text: 'flag-er', emoji: '🇪🇷' },
      { text: 'flag-es', emoji: '🇪🇸' },
      { text: 'flag-et', emoji: '🇪🇹' },
      { text: 'flag-eu', emoji: '🇪🇺' },
      { text: 'flag-fi', emoji: '🇫🇮' },
      { text: 'flag-fj', emoji: '🇫🇯' },
      { text: 'flag-fk', emoji: '🇫🇰' },
      { text: 'flag-fm', emoji: '🇫🇲' },
      { text: 'flag-fo', emoji: '🇫🇴' },
      { text: 'flag-fr', emoji: '🇫🇷' },
      { text: 'flag-ga', emoji: '🇬🇦' },
      { text: 'flag-gb', emoji: '🇬🇧' },
      { text: 'flag-gd', emoji: '🇬🇩' },
      { text: 'flag-ge', emoji: '🇬🇪' },
      { text: 'flag-gf', emoji: '🇬🇫' },
      { text: 'flag-gg', emoji: '🇬🇬' },
      { text: 'flag-gh', emoji: '🇬🇭' },
      { text: 'flag-gi', emoji: '🇬🇮' },
      { text: 'flag-gl', emoji: '🇬🇱' },
      { text: 'flag-gm', emoji: '🇬🇲' },
      { text: 'flag-gn', emoji: '🇬🇳' },
      { text: 'flag-gp', emoji: '🇬🇵' },
      { text: 'flag-gq', emoji: '🇬🇶' },
      { text: 'flag-gr', emoji: '🇬🇷' },
      { text: 'flag-gs', emoji: '🇬🇸' },
      { text: 'flag-gt', emoji: '🇬🇹' },
      { text: 'flag-gu', emoji: '🇬🇺' },
      { text: 'flag-gw', emoji: '🇬🇼' },
      { text: 'flag-gy', emoji: '🇬🇾' },
      { text: 'flag-hk', emoji: '🇭🇰' },
      { text: 'flag-hm', emoji: '🇭🇲' },
      { text: 'flag-hn', emoji: '🇭🇳' },
      { text: 'flag-hr', emoji: '🇭🇷' },
      { text: 'flag-ht', emoji: '🇭🇹' },
      { text: 'flag-hu', emoji: '🇭🇺' },
      { text: 'flag-ic', emoji: '🇮🇨' },
      { text: 'flag-id', emoji: '🇮🇩' },
      { text: 'flag-ie', emoji: '🇮🇪' },
      { text: 'flag-il', emoji: '🇮🇱' },
      { text: 'flag-im', emoji: '🇮🇲' },
      { text: 'flag-in', emoji: '🇮🇳' },
      { text: 'flag-io', emoji: '🇮🇴' },
      { text: 'flag-iq', emoji: '🇮🇶' },
      { text: 'flag-ir', emoji: '🇮🇷' },
      { text: 'flag-is', emoji: '🇮🇸' },
      { text: 'flag-it', emoji: '🇮🇹' },
      { text: 'flag-je', emoji: '🇯🇪' },
      { text: 'flag-jm', emoji: '🇯🇲' },
      { text: 'flag-jo', emoji: '🇯🇴' },
      { text: 'flag-jp', emoji: '🇯🇵' },
      { text: 'flag-ke', emoji: '🇰🇪' },
      { text: 'flag-kg', emoji: '🇰🇬' },
      { text: 'flag-kh', emoji: '🇰🇭' },
      { text: 'flag-ki', emoji: '🇰🇮' },
      { text: 'flag-km', emoji: '🇰🇲' },
      { text: 'flag-kn', emoji: '🇰' },
      { text: 'flag-kp', emoji: '🇰🇵' },
      { text: 'flag-kr', emoji: '🇰🇷' },
      { text: 'flag-kw', emoji: '🇰🇼' },
      { text: 'flag-ky', emoji: '🇰🇾' },
      { text: 'flag-kz', emoji: '🇰🇿' },
      { text: 'flag-la', emoji: '🇱🇦' },
      { text: 'flag-lb', emoji: '🇱🇧' },
      { text: 'flag-lc', emoji: '🇱🇨' },
      { text: 'flag-li', emoji: '🇱🇮' },
      { text: 'flag-lk', emoji: '🇱🇰' },
      { text: 'flag-lr', emoji: '🇱🇷' },
      { text: 'flag-ls', emoji: '🇱🇸' },
      { text: 'flag-lt', emoji: '🇱🇹' },
      { text: 'flag-lu', emoji: '🇱🇺' },
      { text: 'flag-lv', emoji: '🇱🇻' },
      { text: 'flag-ly', emoji: '🇱🇾' },
      { text: 'flag-ma', emoji: '🇲🇦' },
      { text: 'flag-mc', emoji: '🇲🇨' },
      { text: 'flag-md', emoji: '🇲🇩' },
      { text: 'flag-me', emoji: '🇲🇪' },
      { text: 'flag-mf', emoji: '🇲🇫' },
      { text: 'flag-mg', emoji: '🇲🇬' },
      { text: 'flag-mh', emoji: '🇲🇭' },
      { text: 'flag-mk', emoji: '🇲🇰' },
      { text: 'flag-ml', emoji: '🇲🇱' },
      { text: 'flag-mm', emoji: '🇲🇲' },
      { text: 'flag-mn', emoji: '🇲🇳' },
      { text: 'flag-mo', emoji: '🇲🇴' },
      { text: 'flag-mp', emoji: '🇲🇵' },
      { text: 'flag-mq', emoji: '🇲🇶' },
      { text: 'flag-mr', emoji: '🇲🇷' },
      { text: 'flag-ms', emoji: '🇲🇸' },
      { text: 'flag-mu', emoji: '🇲🇺' },
      { text: 'flag-mv', emoji: '🇲🇻' },
      { text: 'flag-mw', emoji: '🇲🇼' },
      { text: 'flag-mx', emoji: '🇲🇽' },
      { text: 'flag-my', emoji: '🇲🇾' },
      { text: 'flag-mz', emoji: '🇲🇿' },
      { text: 'flag-na', emoji: '🇳🇦' },
      { text: 'flag-nc', emoji: '🇳🇨' },
      { text: 'flag-ne', emoji: '🇳🇪' },
      { text: 'flag-nf', emoji: '🇳🇫' },
      { text: 'flag-ng', emoji: '🇳🇬' },
      { text: 'flag-ni', emoji: '🇳🇮' },
      { text: 'flag-nl', emoji: '🇳🇱' },
      { text: 'flag-no', emoji: '🇳🇴' },
      { text: 'flag-np', emoji: '🇳🇵' },
      { text: 'flag-nr', emoji: '🇳🇷' },
      { text: 'flag-nu', emoji: '🇳🇺' },
      { text: 'flag-om', emoji: '🇴🇲' },
      { text: 'flag-pa', emoji: '🇵🇦' },
      { text: 'flag-pe', emoji: '🇵🇪' },
      { text: 'flag-pf', emoji: '🇵🇫' },
      { text: 'flag-pg', emoji: '🇵🇬' },
      { text: 'flag-ph', emoji: '🇵🇭' },
      { text: 'flag-pk', emoji: '🇵🇰' },
      { text: 'flag-pl', emoji: '🇵🇱' },
      { text: 'flag-pm', emoji: '🇵🇲' },
      { text: 'flag-pn', emoji: '🇵🇳' },
      { text: 'flag-pr', emoji: '🇵🇷' },
      { text: 'flag-ps', emoji: '🇵🇸' },
      { text: 'flag-pt', emoji: '🇵🇹' },
      { text: 'flag-pw', emoji: '🇵🇼' },
      { text: 'flag-py', emoji: '🇵🇾' },
      { text: 'flag-qa', emoji: '🇶🇦' },
      { text: 'flag-re', emoji: '🇷🇪' },
      { text: 'flag-ro', emoji: '🇷🇴' },
      { text: 'flag-rs', emoji: '🇷🇸' },
      { text: 'flag-ru', emoji: '🇷🇺' },
      { text: 'flag-rw', emoji: '🇷🇼' },
      { text: 'flag-sa', emoji: '🇸🇦' },
      { text: 'flag-sb', emoji: '🇸🇧' },
      { text: 'flag-sc', emoji: '🇸🇨' },
      { text: 'flag-sd', emoji: '🇸🇩' },
      { text: 'flag-se', emoji: '🇸🇪' },
      { text: 'flag-sg', emoji: '🇸🇬' },
      { text: 'flag-sh', emoji: '🇸🇭' },
      { text: 'flag-si', emoji: '🇸🇮' },
      { text: 'flag-sj', emoji: '🇸🇯' },
      { text: 'flag-sk', emoji: '🇸🇰' },
      { text: 'flag-sl', emoji: '🇸🇱' },
      { text: 'flag-sm', emoji: '🇸🇲' },
      { text: 'flag-sn', emoji: '🇸🇳' },
      { text: 'flag-so', emoji: '🇸🇴' },
      { text: 'flag-sr', emoji: '🇸🇷' },
      { text: 'flag-ss', emoji: '🇸🇸' },
      { text: 'flag-st', emoji: '🇸🇹' },
      { text: 'flag-sv', emoji: '🇸🇻' },
      { text: 'flag-sx', emoji: '🇸🇽' },
      { text: 'flag-sy', emoji: '🇸🇾' },
      { text: 'flag-sz', emoji: '🇸🇿' },
      { text: 'flag-ta', emoji: '🇹🇦' },
      { text: 'flag-tc', emoji: '🇹🇨' },
      { text: 'flag-td', emoji: '🇹🇩' },
      { text: 'flag-tf', emoji: '🇹🇫' },
      { text: 'flag-tg', emoji: '🇹🇬' },
      { text: 'flag-th', emoji: '🇹🇭' },
      { text: 'flag-tj', emoji: '🇹🇯' },
      { text: 'flag-tk', emoji: '🇹🇰' },
      { text: 'flag-tl', emoji: '🇹🇱' },
      { text: 'flag-tm', emoji: '🇹🇲' },
      { text: 'flag-tn', emoji: '🇹🇳' },
      { text: 'flag-to', emoji: '🇹🇴' },
      { text: 'flag-tr', emoji: '🇹🇷' },
      { text: 'flag-tt', emoji: '🇹🇹' },
      { text: 'flag-tv', emoji: '🇹🇻' },
      { text: 'flag-tw', emoji: '🇹🇼' },
      { text: 'flag-tz', emoji: '🇹🇿' },
      { text: 'flag-ua', emoji: '🇺🇦' },
      { text: 'flag-ug', emoji: '🇺🇬' },
      { text: 'flag-um', emoji: '🇺🇲' },
      { text: 'flag-us', emoji: '🇺🇸' },
      { text: 'flag-uy', emoji: '🇺🇾' },
      { text: 'flag-uz', emoji: '🇺🇿' },
      { text: 'flag-va', emoji: '🇻🇦' },
      { text: 'flag-vc', emoji: '🇻🇨' },
      { text: 'flag-ve', emoji: '🇻🇪' },
      { text: 'flag-vg', emoji: '🇻🇬' },
      { text: 'flag-vi', emoji: '🇻🇮' },
      { text: 'flag-vn', emoji: '🇻🇳' },
      { text: 'flag-vu', emoji: '🇻🇺' },
      { text: 'flag-wf', emoji: '🇼🇫' },
      { text: 'flag-ws', emoji: '🇼🇸' },
      { text: 'flag-xk', emoji: '🇽🇰' },
      { text: 'flag-ye', emoji: '🇾🇪' },
      { text: 'flag-yt', emoji: '🇾🇹' },
      { text: 'flag-za', emoji: '🇿🇦' },
      { text: 'flag-zm', emoji: '🇿🇲' },
      { text: 'flag-zw', emoji: '🇿🇼' }
    ],
    []
  )

  const searchList: Emoji[] = useMemo(() => {
    return new Fuse(
      [
        ...people,
        ...nature,
        ...food,
        ...symbols,
        ...activity,
        ...travel,
        ...objects,
        ...flags
      ],
      {
        keys: ['text'],
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        minMatchCharLength: 1
      }
    )
      .search(search)
      .map(({ item }) => item)
  }, [search])

  const handy: Emoji[] = useMemo(
    () => [
      { text: 'thumbsup', emoji: '👍' },
      { text: 'wave', emoji: '👋' },
      { text: 'muscle', emoji: '💪' },
      { text: 'tada', emoji: '🎉' },
      { text: 'raised_hands', emoji: '🙌' }
    ],
    []
  )

  useEffect(() => {
    EventListener.add('modal:emoji', onClose)
    return () => EventListener.remove('modal:emoji', onClose)
  }, [])

  useEffect(() => {
    if (!search) return
    if (!!searchList.length)
      setState({ text: searchList[0].text, emoji: searchList[0].emoji })
  }, [search])
  return (
    <Modal
      maxWidth="max-w-xs"
      isOpen={isOpen}
      onClose={onClose}
      padding={false}
    >
      <div>
        <div id="tab-toolbar">
          <ul>
            {tabs.map((item, key) => (
              <li
                onClick={() => setState({ tab: item })}
                key={key}
                className={`emoji-tab filter-${item}${
                  item === tab ? ' active' : ''
                }`}
              >
                <div className={`i-${item}`} />
              </li>
            ))}
          </ul>
        </div>
        <div className="border-b py-1 px-2 dark:border-neutral-700">
          <input
            className="w-full rounded border py-1 px-3 text-sm dark:border-neutral-700 dark:bg-transparent"
            value={search}
            name="search"
            onChange={onChange}
            placeholder="모든 이모티콘 검색"
            autoComplete="off"
            autoFocus
            spellCheck={false}
          />
        </div>
        <div className="px-3 py-1 text-sm font-semibold">
          {!!search ? '검색 결과' : EMOJI_TOOLBAR[tab]}
        </div>
        <div className="grid max-h-72 grid-cols-10 gap-1 overflow-y-auto overscroll-contain bg-white px-2 dark:bg-neutral-800">
          {!!search ? (
            searchList.map((item, key) => (
              <button
                key={key}
                onClick={() => onEmojiClick(item.text, item.emoji)}
                className="rounded p-1 hover:bg-blue-50"
                title={`:${item.text}:`}
                onMouseOver={() =>
                  setState({ text: item.text, emoji: item.emoji })
                }
                onMouseOut={() => setState({ text: '', emoji: '' })}
              >
                <span className={`bem bem-${item.text} ap ap-${item.text}`}>
                  {item.emoji}
                </span>
              </button>
            ))
          ) : (
            <>
              {tab === 'people' &&
                people.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span
                      className={`bem bem-${item.text} ap ap-${item.text}`}
                      title={`:${item.text}:`}
                    >
                      {item.emoji}
                    </span>
                  </button>
                ))}
              {tab === 'nature' &&
                nature.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    title={`:${item.text}:`}
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span className={`bem bem-${item.text} ap ap-${item.text}`}>
                      {item.emoji}
                    </span>
                  </button>
                ))}
              {tab === 'food' &&
                food.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    title={`:${item.text}:`}
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span className={`bem bem-${item.text} ap ap-${item.text}`}>
                      {item.emoji}
                    </span>
                  </button>
                ))}
              {tab === 'symbols' &&
                symbols.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span
                      className={`bem bem-${item.text} ap ap-${item.text}`}
                      title={`:${item.text}:`}
                    >
                      {item.emoji}
                    </span>
                  </button>
                ))}
              {tab === 'activity' &&
                activity.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span
                      className={`bem bem-${item.text} ap ap-${item.text}`}
                      title={`:${item.text}:`}
                    >
                      {item.emoji}
                    </span>
                  </button>
                ))}
              {tab === 'travel' &&
                travel.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    title={`:${item.text}:`}
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span className={`bem bem-${item.text} ap ap-${item.text}`}>
                      {item.emoji}
                    </span>
                  </button>
                ))}
              {tab === 'objects' &&
                objects.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    title={`:${item.text}:`}
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span className={`bem bem-${item.text} ap ap-${item.text}`}>
                      {item.emoji}
                    </span>
                  </button>
                ))}
              {tab === 'flags' &&
                flags.map((item, key) => (
                  <button
                    onClick={() => onEmojiClick(item.text, item.emoji)}
                    key={key}
                    className="rounded p-1 hover:bg-blue-50"
                    title={`:${item.text}:`}
                    onMouseOver={() =>
                      setState({ text: item.text, emoji: item.emoji })
                    }
                    onMouseOut={() => setState({ text: '', emoji: '' })}
                  >
                    <span className={`bem bem-${item.text} ap ap-${item.text}`}>
                      {item.emoji}
                    </span>
                  </button>
                ))}
            </>
          )}
        </div>
        <div className="flex items-center justify-between border-t px-3 pt-2 dark:border-neutral-700">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-400">
            간편한 반응
          </span>
          <div className="flex items-center gap-1">
            {handy.map((item, key) => (
              <button
                onClick={() => onEmojiClick(item.text, item.emoji)}
                key={key}
                className="rounded p-1 hover:bg-blue-50"
                title={`:${item.text}:`}
                onMouseOver={() =>
                  setState({ text: item.text, emoji: item.emoji })
                }
                onMouseOut={() => setState({ text: '', emoji: '' })}
              >
                <span className={`bem bem-${item.text} ap ap-${item.text}`}>
                  {item.emoji}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex h-10 items-center gap-2 px-3">
          {!!text && (
            <>
              <span className={`bem bem-${text} ap ap-${text}`}>{emoji}</span>
              <span>:{text}:</span>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default EmojiModal
