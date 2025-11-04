const allData = [
    { id: 1, map: 'dongne', price: 1500, rating: 1.2, x: 28, y: 20, popupImage: 'images/popups/item_1.png' },
    { id: 2, map: 'dongne', price: 21000, rating: 1.8, x: 27, y: 16, popupImage: 'images/popups/item_2.png' },
    { id: 3, map: 'dongne', price: 5000, rating: 4.2, x: 40, y: 56, popupImage: 'images/popups/item_3.png' },
    { id: 4, map: 'dongne', price: 18000, rating: 3.3, x: 23, y: 58, popupImage: 'images/popups/item_4.png' },
    { id: 5, map: 'dongne', price: 11000, rating: 2.5, x: 26, y: 62, popupImage: 'images/popups/item_5.png' },
    { id: 6, map: 'dongne', price: 3100, rating: 3.2, x: 35, y: 35, popupImage: 'images/popups/item_6.png' },
    { id: 7, map: 'dongne', price: 8000, rating: 4.8, x: 37, y: 53, popupImage: 'images/popups/item_7.png' },
    { id: 8, map: 'dongne', price: 32500, rating: 4.5, x: 42, y: 47, popupImage: 'images/popups/item_8.png' },
    { id: 9, map: 'dongne', price: 33000, rating: 2.8, x: 37, y: 32, popupImage: 'images/popups/item_9.png' },
    { id: 10, map: 'dongne', price: 14500, rating: 3.8, x: 29, y: 68, popupImage: 'images/popups/item_10.png' },
    { id: 11, map: 'dongne', price: 7200, rating: 1.4, x: 36, y: 38, popupImage: 'images/popups/item_11.png' },
    { id: 12, map: 'dongne', price: 17500, rating: 2.2, x: 48, y: 51, popupImage: 'images/popups/item_12.png' },
    // ... (모든 항목의 y 값을 위 공식으로 재계산) ...

    { id: 13, map: 'hakgyo', price: 14000, rating: 2.9, x: 37, y: 72, popupImage: 'images/popups/item_13.png' },
    { id: 14, map: 'hakgyo', price: 6800, rating: 1.2, x: 42, y: 30, popupImage: 'images/popups/item_14.png' },
    { id: 15, map: 'hakgyo', price: 2600, rating: 3.6, x: 46, y: 76, popupImage: 'images/popups/item_15.png' }, // (지도상 ₩2,800 위치 참고)
    { id: 16, map: 'hakgyo', price: 6500, rating: 1.9, x: 43, y: 79, popupImage: 'images/popups/item_16.png' },
    { id: 17, map: 'hakgyo', price: 4200, rating: 1.5, x: 44, y: 73, popupImage: 'images/popups/item_17.png' },
    { id: 18, map: 'hakgyo', price: 10500, rating: 4.5, x: 38, y: 27, popupImage: 'images/popups/item_18.png' },
    { id: 19, map: 'hakgyo', price: 3300, rating: 2.5, x: 38, y: 22, popupImage: 'images/popups/item_19.png' },
    { id: 20, map: 'hakgyo', price: 10000, rating: 3.8, x: 36, y: 29, popupImage: 'images/popups/item_20.png' },
    { id: 21, map: 'hakgyo', price: 18500, rating: 4.5, x: 22, y: 38, popupImage: 'images/popups/item_21.png' },
    { id: 22, map: 'hakgyo', price: 1800, rating: 4.8, x: 43, y: 27, popupImage: 'images/popups/item_22.png' },
    { id: 23, map: 'hakgyo', price: 7500, rating: 2.7, x: 40, y: 81, popupImage: 'images/popups/item_23.png' },
    { id: 24, map: 'hakgyo', price: 19000, rating: 3.8, x: 36, y: 25, popupImage: 'images/popups/item_24.png' }


];

// (2) 현재 선택된 상태를 저장할 변수
let currentMap = 'dongne'; // 현재 보고있는 지도
let currentFilter = 0;   // 현재 필터 (0 = all)

// (3) 필요한 HTML 요소들을 미리 찾아두기
const mapContainer = document.getElementById('map-container');
const mapImage = document.getElementById('map-image');
const popup = document.getElementById('popup-modal');
const popupCloseBtn = document.getElementById('popup-close');
const popupImageEl = document.getElementById('popup-image');

// --- [핵심 기능 1: 지도에 가격 버튼 그리기] ---
function renderPriceTags() {
    // 1. 기존에 있던 태그들 모두 삭제
    const oldTags = document.querySelectorAll('.price-tag');
    oldTags.forEach(tag => tag.remove());

    // 2. allData에서 현재 지도(currentMap)에 맞는 데이터만 필터링
    const mapData = allData.filter(item => item.map === currentMap);

    // 3. 필터링된 데이터에서 현재 별점(currentFilter)에 맞는 데이터만 필터링
    const filteredData = mapData.filter(item => {
        if (currentFilter === 0) {
            return true; // 'all' 버튼
        }
        
        // '4.0~' 버튼은 4.0 이상 모두 표시
        if (currentFilter === 4) {
            return item.rating >= 4.0;
        }

        // 1.0~, 2.0~, 3.0~ 버튼은 해당 범위만 표시
        // 예: currentFilter가 2면 (2.0 <= rating < 3.0)
        return item.rating >= currentFilter && item.rating < (currentFilter + 1);
    });

    // 4. 최종 필터링된 데이터를 가지고 HTML 요소(가격 버튼) 생성
    filteredData.forEach(item => {
        const tag = document.createElement('div');
        tag.className = 'price-tag';
        tag.innerText = `₩${item.price.toLocaleString()}`; // 1500 -> ₩1,500
        tag.style.left = `${item.x}%`;
        tag.style.top = `${item.y}%`;

        // 5. 생성된 태그에 클릭 이벤트 추가
        tag.addEventListener('click', () => {
            showPopup(item.popupImage); // 이미지 경로 전달
        });

        // 6. 지도 컨테이너에 태그 추가
        mapContainer.appendChild(tag);
    });
}

// --- [핵심 기능 2: 팝업창 보여주기] ---
function showPopup(imagePath) {
    // 1. 팝업 이미지 요소의 src를 전달받은 경로로 변경
    popupImageEl.src = imagePath;

    // 2. 팝업창 보여주기 (숨김 클래스 제거)
    popup.classList.remove('hidden');
}

// --- [핵심 기능 3: 팝업창 닫기] ---
popupCloseBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

// --- [핵심 기능 4: 지도 변경 버튼] ---
document.getElementById('btn-dongne').addEventListener('click', () => {
    currentMap = 'dongne';
    mapImage.src = 'images/dongne_map.png'; // 지도 이미지 변경
    
    // 버튼 활성화 스타일
    document.getElementById('btn-dongne').classList.add('active');
    document.getElementById('btn-hakgyo').classList.remove('active');
    
    renderPriceTags(); // 가격 버튼 다시 그리기
});

document.getElementById('btn-hakgyo').addEventListener('click', () => {
    currentMap = 'hakgyo';
    mapImage.src = 'images/hakgyo_map.png'; // 지도 이미지 변경
    
    // 버튼 활성화 스타일
    document.getElementById('btn-dongne').classList.remove('active');
    document.getElementById('btn-hakgyo').classList.add('active');
    
    renderPriceTags(); // 가격 버튼 다시 그리기
});


// --- [핵심 기능 5: 별점 필터 버튼] ---
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. data-filter="1" 처럼 HTML에 심어둔 값을 가져옴
        currentFilter = parseFloat(button.dataset.filter);
        
        // (추가) 클릭한 버튼에만 'active' 스타일 적용
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 2. 가격 버튼 다시 그리기
        renderPriceTags(); 
    });
});


// --- [최초 실행] ---
// 페이지가 처음 로드되었을 때, 기본 지도를 한 번 그려줍니다.
// (맨 처음에 'all' 버튼이 눌린 것처럼 보이게 스타일 추가)
document.querySelector('.filter-btn[data-filter="0"]').classList.add('active');
renderPriceTags();