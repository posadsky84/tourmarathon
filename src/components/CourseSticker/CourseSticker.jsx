import './courseSticker.css';

const CourseSticker = ({type, value}) => {
  return (
    <div className={`course-sticker ${type}`}>
      <span className="course-sticker-label">{value} km</span>
    </div>
  );
};

export default CourseSticker;
