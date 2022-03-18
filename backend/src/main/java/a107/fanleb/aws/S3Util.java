package a107.fanleb.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import java.io.File;

public class S3Util {

    private AmazonS3 amazonS3;
    private String bucketName;

    public S3Util(AmazonS3 amazonS3, String bucketName) {
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }

    public String getFileURL(String fileName) {
        String imgName = (fileName).replace(File.separatorChar, '/');
        return amazonS3.generatePresignedUrl(new GeneratePresignedUrlRequest(bucketName, imgName))
                .toString();
    }
}